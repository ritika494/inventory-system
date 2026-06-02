from pydantic import BaseModel, EmailStr, Field
from typing import Optional


class CustomerBase(BaseModel):
    full_name: str = Field(..., min_length=2)
    email: EmailStr
    phone: str


class CustomerCreate(CustomerBase):
    pass


class CustomerUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None


class CustomerResponse(CustomerBase):
    id: int

    class Config:
        from_attributes = True