import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productService from '../services/productService';

const API_URL = "https://localhost:7284";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const data = await productService.getProductById(id);
                setProduct(data);
            } catch (error) {
                console.error(error);
            }
        };

        loadProduct();
    }, [id]);

    if (!product) {
        return <h3>Đang tải...</h3>;
    }

    return (
        <div className="container mt-4">
            <h2>{product.name}</h2>

            <img
                src={`${API_URL}${product.imageUrl}`}
                alt={product.name}
                style={{ width: "400px" }}
            />

            <p className="mt-3">
                <strong>Mô tả:</strong> {product.description}
            </p>

            <p>
                <strong>Giá:</strong>{" "}
                {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND"
                }).format(product.price)}
            </p>

            <p>
                <strong>Tồn kho:</strong> {product.stockQuantity}
            </p>
        </div>
    );
};

export default ProductDetail;