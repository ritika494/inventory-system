from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.customer import Customer
from app.schemas.customer import (
    CustomerCreate,
    CustomerUpdate,
    CustomerResponse
)

router = APIRouter(
    prefix="/customers",
    tags=["Customers"]
)


# CREATE CUSTOMER
@router.post(
    "/",
    response_model=CustomerResponse,
    status_code=status.HTTP_201_CREATED
)
def create_customer(
    customer: CustomerCreate,
    db: Session = Depends(get_db)
):
    existing_customer = (
        db.query(Customer)
        .filter(Customer.email == customer.email)
        .first()
    )

    if existing_customer:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    db_customer = Customer(
        full_name=customer.full_name,
        email=customer.email,
        phone=customer.phone
    )

    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)

    return db_customer


# GET ALL CUSTOMERS 
@router.get(
    "/",
    response_model=list[CustomerResponse]
)
def get_customers(
    db: Session = Depends(get_db)
):
    return db.query(Customer).all()


# GET CUSTOMER BY ID
@router.get(
    "/{customer_id}",
    response_model=CustomerResponse
)
def get_customer(
    customer_id: int,
    db: Session = Depends(get_db)
):
    customer = (
        db.query(Customer)
        .filter(Customer.id == customer_id)
        .first()
    )

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    return customer


# UPDATE CUSTOMER
@router.put(
    "/{customer_id}",
    response_model=CustomerResponse
)
def update_customer(
    customer_id: int,
    payload: CustomerUpdate,
    db: Session = Depends(get_db)
):
    customer = (
        db.query(Customer)
        .filter(Customer.id == customer_id)
        .first()
    )

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    if payload.email:
        existing_customer = (
            db.query(Customer)
            .filter(
                Customer.email == payload.email,
                Customer.id != customer_id
            )
            .first()
        )

        if existing_customer:
            raise HTTPException(
                status_code=400,
                detail="Email already exists"
            )

    update_data = payload.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(customer, key, value)

    db.commit()
    db.refresh(customer)

    return customer


# DELETE CUSTOMER
@router.delete("/{customer_id}")
def delete_customer(
    customer_id: int,
    db: Session = Depends(get_db)
):
    customer = (
        db.query(Customer)
        .filter(Customer.id == customer_id)
        .first()
    )

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    db.delete(customer)
    db.commit()

    return {
        "message": "Customer deleted successfully"
    }