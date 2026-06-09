from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import auth, billing, webhooks, connector_hub
from app.core.database import init_db
import uvicorn
import os
from importlib import import_module
from contextlib import asynccontextmanager

def load_plugins(app: FastAPI):
    plugin_path = os.path.join(os.path.dirname(__file__), "app", "plugins")
    if os.path.exists(plugin_path):
        for plugin in os.listdir(plugin_path):
            plugin_dir = os.path.join(plugin_path, plugin)
            if os.path.isdir(plugin_dir):
                try:
                    module = import_module(f"app.plugins.{plugin}.endpoints")
                    if hasattr(module, "router"):
                        app.include_router(module.router, prefix=f"/api/{plugin}", tags=[plugin])
                        print(f"Plugin loaded: {plugin}")
                except (ImportError, AttributeError):
                    print(f"Plugin failed to load: {plugin}")

# Initialize Database
@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    load_plugins(app)
    yield
app = FastAPI(title="SaaS-Data Engine API", lifespan=lifespan)

# Configure CORS - Move to the top
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
# ...

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(billing.router, prefix="/api/billing", tags=["billing"])
app.include_router(webhooks.router, prefix="/api/webhooks", tags=["webhooks"])
app.include_router(connector_hub.router, prefix="/api/connectors", tags=["connectors"])


@app.get("/")
async def root():
    return {"message": "Welcome to the SaaS-Data Engine API"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
