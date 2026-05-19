import re

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator

class UserCreate(BaseModel):
    name: str = Field(min_length=1, max_length=255)
    email: EmailStr = Field(min_length=1, max_length=255)
    password: str = Field(min_length=8, max_length=30)

    @field_validator('password')
    def password_checker(cls, v):
        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", v):
            raise ValueError("Password requires at least 1 special character")
        if not re.search(r"[A-Z]", v):
            raise ValueError("Password requires at least 1 uppercase character")
        if not re.search(r"\d", v):
            raise ValueError("Password requires at least 1 number")
        return v

class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr

    class ConfigDict:
        from_attributes = True

class ProductResponse(BaseModel):
    id: int
    name: str
    description: str
    price: float

    model_config = ConfigDict(from_attributes=True)

class ProductListResponse(BaseModel):
    products: list[ProductResponse]


class CartItemResponse(BaseModel):
    id: int
    product_id: int
    quantity: int
    product: ProductResponse

class CartResponse(BaseModel):
    id: int
    user_id: int
    cart_items: list[CartItemResponse]

    model_config = ConfigDict(from_attributes=True)

class CartCreate(BaseModel):
    product_id: int
    quantity: int = 1