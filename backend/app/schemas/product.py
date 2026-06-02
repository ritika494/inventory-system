from pydantic import BaseModel, Field
from typing import Optional


class ProductBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    sku: str = Field(..., min_length=2, max_length=50)
    price: float = Field(..., gt=0)
    quantity: int = Field(..., ge=0)


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    sku: Optional[str] = None
    price: Optional[float] = Field(None, gt=0)
    quantity: Optional[int] = Field(None, ge=0)


class ProductResponse(ProductBase):
    id: int

    class Config:
        from_attributes = True