import stripe
import os
from fastapi import APIRouter, Depends, HTTPException, Request, Header, Query
from app.api.endpoints.deps import get_active_user
from app.models.user import User
from app.core.database import get_session
from sqlmodel import Session, select

router = APIRouter()

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
endpoint_secret = os.getenv("STRIPE_WEBHOOK_SECRET")

# Mapping plan names to real Stripe Price IDs
# IMPORTANT: Replace these placeholder keys with your actual Stripe Price IDs from your dashboard.
PRICE_MAP = {
    "price_free_id": "free",      # Replace "price_free_id" with real ID or handle free logic separately
    "price_starter_id": "starter", # Replace "price_starter_id" with real ID
    "price_data_pack_id": "data_pack", # Replace "price_data_pack_id" with real ID
    "price_bundle_id": "hybrid"    # Replace "price_bundle_id" with real ID
}

@router.post("/create-checkout-session")
async def create_checkout_session(plan: str = Query(...), current_user: User = Depends(get_active_user)):
    print(f"DEBUG: Plan received: '{plan}'")
    if plan not in PRICE_MAP.values():
        raise HTTPException(status_code=400, detail=f"Invalid plan selected. Received: '{plan}'")
        
    # Get the key (Price ID) from the value (plan name)
    price_id = {v: k for k, v in PRICE_MAP.items()}[plan]
    
    if price_id.startswith("price_"):
        try:
            checkout_session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=[{
                    'price': price_id, 
                    'quantity': 1,
                }],
                mode='subscription',
                success_url='http://localhost:4200/dashboard?success=true',
                cancel_url='http://localhost:4200/billing?canceled=true',
                customer_email=current_user.email,
            )
            return {"url": checkout_session.url}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    else:
        # Handle free plan or invalid setup
        raise HTTPException(status_code=400, detail="Plan configuration error: Price ID not configured.")

@router.post("/webhook")
async def stripe_webhook(request: Request, stripe_signature: str = Header(None)):
    payload = await request.body()

    try:
        event = stripe.Webhook.construct_event(
            payload, stripe_signature, endpoint_secret
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        customer_email = session.get('customer_email')
        price_id = session.get('line_items', {}).get('data', [{}])[0].get('price', {}).get('id')

        # Use next(get_session()) to get a DB session
        db_gen = get_session()
        session_db = next(db_gen)

        try:
            statement = select(User).where(User.email == customer_email)
            user = session_db.exec(statement).first()
            if user and price_id in PRICE_MAP:
                user.subscription_status = 'active'
                user.subscription_plan = PRICE_MAP[price_id]
                session_db.add(user)
                session_db.commit()
                print(f"Subscription activated: {user.subscription_plan} for: {customer_email}")
        finally:
            next(db_gen, None) # Close the session

    return {"status": "success"}
