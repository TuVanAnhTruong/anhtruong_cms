import React from 'react';
import { Link } from 'react-router-dom';
import "./card.css";
import CartManager from '../utils/CartManager';
function ProductCard({ product }) {
    console.log(product);

    if (!product) return null;

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(value);
    };
    const API_URL = "https://localhost:7284";

    const salePrice =
        product.discountPercent > 0
            ? product.price - (product.price * product.discountPercent / 100)
            : product.price;
    const handleAddToCart = () => {
        CartManager.addToCart(product);

        alert("Đã thêm vào giỏ hàng");
    };

    return (
        <div
            className="product-card group position-relative h-100"
            style={{
                background: "#fff",
                overflow: "hidden",
                transition: "all .3s"
            }}
        >
            <div
                style={{
                    position: "relative",
                    aspectRatio: "3 / 4",
                    background: "#f7f6f3",
                    overflow: "hidden",
                }}
                className="product-image-wrapper"
            >
                <img
                    src={product.image || `${API_URL}${product.imageUrl}`}
                    alt={product.name}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform .6s ease",
                    }}
                    className="product-image"
                />

                {product.isBestSeller && (
                    <span
                        style={{
                            position: "absolute",
                            top: 12,
                            left: 12,
                            background: "#fff",
                            color: "#000",
                            fontSize: "10px",
                            fontWeight: 600,
                            padding: "5px 10px",
                            letterSpacing: "1px",
                            textTransform: "uppercase",
                            zIndex: 2
                        }}
                    >
                        Best Seller
                    </span>
                )}

                {/* Nút giỏ hàng */}
                <button
                    style={{
                        position: "absolute",
                        bottom: "15px",
                        right: "15px",
                        width: "45px",
                        height: "45px",
                        borderRadius: "50%",
                        border: "none",
                        background: "#fff",
                        boxShadow: "0 4px 15px rgba(0,0,0,.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: 0,
                        transform: "translateY(15px)",
                        transition: ".3s",
                        zIndex: 2
                    }}
                    className="cart-btn"
                    onClick={handleAddToCart}
                >
                    <i className="fas fa-shopping-cart"></i>
                </button>

                {product.isBestSeller && (
                    <span
                        className="badge bg-danger position-absolute"
                        style={{
                            top: 15,
                            left: 15
                        }}
                    >
                        Bán chạy
                    </span>
                )}

                {product.isNew && (
                    <span
                        className="badge bg-success position-absolute"
                        style={{
                            top: 15,
                            right: 15
                        }}
                    >
                        Mới
                    </span>
                )}

                {product.discountPercent > 0 && (
                    <span
                        className="badge bg-danger position-absolute"
                        style={{
                            top: product.isNew ? 45 : 15,
                            right: 15
                        }}
                    >
                        -{product.discountPercent}%
                    </span>
                )}
            </div>

            <div className="text-center p-3">
                <h6
                    className="fw-semibold mb-2"
                    style={{
                        minHeight: "48px"
                    }}
                >
                    {product.name}
                </h6>

                {product.discountPercent > 0 && (
                    <div
                        style={{
                            textDecoration: "line-through",
                            color: "#999"
                        }}
                    >
                        {formatCurrency(product.price)}
                    </div>
                )}

                <div
                    className="fw-bold"
                    style={{
                        color: "#c59d5f",
                        fontSize: "18px"
                    }}
                >
                    {formatCurrency(salePrice)}
                </div>

                <div className="d-flex gap-2 mt-3">
                    <div className="d-flex justify-content-center mt-3">
                        <Link
                            to={`/product/${product.id}`}
                            style={{
                                border: "1px solid #d9d9d9",
                                padding: "10px 25px",
                                fontSize: "13px",
                                letterSpacing: "1px",
                                textTransform: "uppercase",
                                textDecoration: "none",
                                color: "#111",
                                transition: ".3s",
                            }}
                            className="detail-btn"
                        >
                            Chi tiết
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;