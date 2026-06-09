# Getting Started with SaaS-Data Engine

Follow these steps to get the project running locally in minutes.

## Option 1: Using Docker (Recommended)

1. Make sure you have Docker and Docker Compose installed.
2. Run the following command at the root of the project:
   ```bash
   docker-compose up --build
   ```
3. Access the application at `http://localhost`.

## Option 2: Manual Local Setup

### Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the backend:
   ```bash
   python main.py
   ```
   The API will be available at `http://localhost:8000`.

### Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend:
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:4200`.

## Key Features to Test

1. **Register**: Create a new account at `/register`.
2. **Login**: Sign in with your credentials.
3. **Dashboard**: Upload a CSV or Excel file to see the data engine in action.
4. **Billing**: Click "Upgrade" to see the mock checkout flow.

## Configuration

Update `backend/.env` with your own keys for production use:
- `SECRET_KEY`: A random string for JWT security.
- `STRIPE_SECRET_KEY`: Your Stripe secret key.
- `DATABASE_URL`: Your PostgreSQL connection string (defaults to SQLite if not provided).
