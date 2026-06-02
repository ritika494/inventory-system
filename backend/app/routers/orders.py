from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db

from app.models.order import Order
from app.models.customer import Customer
from app.models.product import Product

from app.schemas.order import (
    OrderCreate,
    OrderResponse
)

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)


# CREATE ORDER
@router.post(
    "/",
    response_model=OrderResponse,
    status_code=status.HTTP_201_CREATED
)
def create_order(
    order: OrderCreate,
    db: Session = Depends(get_db)
):
    customer = (
        db.query(Customer)
        .filter(Customer.id == order.customer_id)
        .first()
    )

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )
        
    product = (
        db.query(Product)
        .filter(Product.id == order.product_id)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )
        
    if product.quantity < order.quantity:
        raise HTTPException(
            status_code=400,
            detail="Insufficient stock"
        )
        
    total_amount = (
        product.price *
        order.quantity
    )
    
    product.quantity -= order.quantity
    
    db_order = Order(
        customer_id=order.customer_id,
        product_id=order.product_id,
        quantity=order.quantity,
        total_amount=total_amount
    )

    db.add(db_order)

    db.commit()

    db.refresh(db_order)

    return db_order

# GET ALL ORDERS
@router.get(
    "/",
    response_model=list[OrderResponse]
)
def get_orders(
    db: Session = Depends(get_db)
):
    return db.query(Order).all()

# GET ORDER BY ID
@router.get(
    "/{order_id}",
    response_model=OrderResponse
)
def get_order(
    order_id: int,
    db: Session = Depends(get_db)
):
    order = (
        db.query(Order)
        .filter(Order.id == order_id)
        .first()
    )

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    return order

# DELETE ORDER
@router.delete("/{order_id}")
def delete_order(
    order_id: int,
    db: Session = Depends(get_db)
):
    order = (
        db.query(Order)
        .filter(Order.id == order_id)
        .first()
    )

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    product = (
        db.query(Product)
        .filter(Product.id == order.product_id)
        .first()
    )

    if product:
        product.quantity += order.quantity

    db.delete(order)

    db.commit()

    return {
        "message": "Order deleted successfully"
    }