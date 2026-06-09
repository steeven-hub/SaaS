from app.core.database import engine
from app.models.user import User
from app.core.security import get_password_hash
from sqlmodel import Session, select

def create_admin():
    with Session(engine) as session:
        # Check if admin already exists
        statement = select(User).where(User.email == "admin@afrihealth.com")
        existing_admin = session.exec(statement).first()
        
        if existing_admin:
            print("Admin user already exists.")
            return

        admin_user = User(
            email="admin@afrihealth.com",
            hashed_password=get_password_hash("admin123"),
            is_superuser=True,
            is_active=True,
            first_name="Admin",
            last_name="Afrihealth"
        )
        session.add(admin_user)
        session.commit()
        print("Admin user created successfully!")
        print("Email: admin@afrihealth.com")
        print("Password: admin123")

if __name__ == "__main__":
    create_admin()
