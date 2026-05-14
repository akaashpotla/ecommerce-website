from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.product import Product as ProductModel
from app.schemas import ProductResponse, ProductListResponse

router = APIRouter(prefix="/api/v1", tags=["products"])

@router.get("/product", response_model=ProductListResponse, status_code=status.HTTP_200_OK)
def get_products(db: Session = Depends(get_db)):
    products = db.query(ProductModel).all()
    return {"products": products}


@router.get("/product/{id}", response_model=ProductResponse, status_code=status.HTTP_200_OK)
def get_product(id: int, db: Session = Depends(get_db)):
    product = db.query(ProductModel).filter(ProductModel.id == id).first()
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return product