from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.product import Product
from app.schemas.product import (
    ProductCreate,
    ProductUpdate,
    ProductResponse
)

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)


# CREATE PRODUCT
@router.post(
    "/",
    response_model=ProductResponse,
    status_code=status.HTTP_201_CREATED
)
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db)
):
    existing_product = (
        db.query(Product)
        .filter(Product.sku == product.sku)
        .first()
    )

    if existing_product:
        raise HTTPException(
            status_code=400,
            detail="SKU already exists"
        )

    db_product = Product(
        name=product.name,
        sku=product.sku,
        price=product.price,
        quantity=product.quantity
    )

    db.add(db_product)
    db.commit()
    db.refresh(db_product)

    return db_product


# GET ALL PRODUCTS
@router.get(
    "/",
    response_model=list[ProductResponse]
)
def get_products(
    db: Session = Depends(get_db)
):
    return db.query(Product).all()


# GET PRODUCT BY ID
@router.get(
    "/{product_id}",
    response_model=ProductResponse
)
def get_product(
    product_id: int,
    db: Session = Depends(get_db)
):
    product = (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return product


# UPDATE PRODUCT
@router.put(
    "/{product_id}",
    response_model=ProductResponse
)
def update_product(
    product_id: int,
    payload: ProductUpdate,
    db: Session = Depends(get_db)
):
    product = (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    # Prevent duplicate SKU
    if payload.sku:
        existing_product = (
            db.query(Product)
            .filter(
                Product.sku == payload.sku,
                Product.id != product_id
            )
            .first()
        )

        if existing_product:
            raise HTTPException(
                status_code=400,
                detail="SKU already exists"
            )

    update_data = payload.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(product, key, value)

    db.commit()
    db.refresh(product)

    return product


# DELETE PRODUCT
@router.delete(
    "/{product_id}"
)
def delete_product(
    product_id: int,
    db: Session = Depends(get_db)
):
    product = (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    db.delete(product)
    db.commit()

    return {
        "message": "Product deleted successfully"
    }