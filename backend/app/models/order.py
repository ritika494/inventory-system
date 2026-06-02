from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Float
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class Order(Base):
    __tablename__ = "orders"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    customer_id = Column(
        Integer,
        ForeignKey("customers.id"),
        nullable=False
    )

    product_id = Column(
        Integer,
        ForeignKey("products.id"),
        nullable=False
    )
    
    customer = relationship(
        "Customer",
        back_populates="orders"
    )
    
    product = relationship(
        "Product",
        back_populates="orders"
    )

    quantity = Column(
        Integer,
        nullable=False
    )

    total_amount = Column(
        Float,
        nullable=False
    )
    
   