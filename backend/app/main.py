from fastapi import FastAPI

from app.database import Base
from app.database import engine
from fastapi.middleware.cors import CORSMiddleware

from app.routers.products import router as product_router
from app.routers.customers import router as customer_router
from app.routers.orders import router as order_router
from app.routers.dashboard import router as dashboard_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Inventory Management API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(product_router)
app.include_router(customer_router)
app.include_router(order_router)
app.include_router(dashboard_router)


@app.get("/")
def health_check():
    return {
        "message": "Inventory API Running"
    }