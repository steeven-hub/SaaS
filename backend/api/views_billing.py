import stripe
import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from users.models import User

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
endpoint_secret = os.getenv("STRIPE_WEBHOOK_SECRET")

PRICE_MAP = {
    "price_starter_id": "starter",
    "price_pro_id": "pro",
    "price_enterprise_id": "enterprise"
}

class CreateCheckoutSessionView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            print("DEBUG: START - CreateCheckoutSessionView.post")
            plan = request.data.get('plan', '').lower()
            print(f"DEBUG: Received plan: '{plan}'")
            
            # Valid plans are starter, pro, enterprise
            if plan not in PRICE_MAP.values():
                print(f"DEBUG: ERROR - Invalid plan '{plan}'")
                return Response({"detail": f"Invalid plan selected: '{plan}'"}, status=status.HTTP_400_BAD_REQUEST)
                
            # Inverse map to get price_id from plan name
            price_id = {v: k for k, v in PRICE_MAP.items()}.get(plan)
            
            # Mock mode for development: trigger if keys are placeholders OR if we are using placeholder price IDs
            is_mock_key = not stripe.api_key or "sk_test_..." in stripe.api_key or "generate-a-secure" in stripe.api_key
            is_placeholder_price = price_id and "price_" in price_id and "_id" in price_id

            if is_mock_key or is_placeholder_price:
                 print(f"DEBUG: Returning MOCK checkout URL (is_mock_key={is_mock_key}, is_placeholder={is_placeholder_price})")
                 # Update user plan directly in mock mode
                 user = request.user
                 user.subscription_plan = plan
                 user.subscription_status = 'active'
                 user.save()
                 return Response({"url": f"http://localhost:5173/dashboard?success=true&mock=true&plan={plan}"})

            print(f"DEBUG: Using price_id: {price_id}")
            
            checkout_session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=[{
                    'price': price_id, 
                    'quantity': 1,
                }],
                mode='subscription',
                success_url='http://localhost:5173/dashboard?success=true',
                cancel_url='http://localhost:5173/checkout?canceled=true',
                customer_email=request.user.email,
                metadata={'plan': plan},
            )
            print(f"DEBUG: SUCCESS - Stripe session {checkout_session.id}")
            return Response({"url": checkout_session.url})
        except Exception as e:
            print(f"DEBUG: CRITICAL ERROR - {str(e)}")
            import traceback
            traceback.print_exc()
            return Response({"detail": f"Internal Server Error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class StripeWebhookView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        payload = request.body
        sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')

        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, endpoint_secret
            )
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        if event['type'] == 'checkout.session.completed':
            session = event['data']['object']
            customer_email = session.get('customer_email')
            
            # Retrieve the plan from session line items metadata or similar
            # For simplicity, we'll assume the metadata contains the plan
            plan = session.get('metadata', {}).get('plan', 'starter')
            
            try:
                user = User.objects.get(email=customer_email)
                user.subscription_status = 'active'
                user.subscription_plan = plan
                user.save()
            except User.DoesNotExist:
                pass

        return Response({"status": "success"})
