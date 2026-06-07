import React, { useState, useEffect } from 'react';
import productService from '../services/productService';
import { useNavigate } from 'react-router-dom';
const ProductList = ({ categoryId }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    //useEffect(() => {
    //    const fetchProducts = async () => {
    //        try {
    //            setLoading(true);
    //            const data = await productService.getAllProducts();
    //            setProducts(data);
    //        } catch (error) {
    //            console.error("L?i khi t?i danh sách s?n ph?m:", error);
    //        } finally {
    //            setLoading(false);
    //        }
    //    };

    //    fetchProducts();
    //}, []);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);

                let data;

                if (categoryId) {
                    data = await productService.getProductsByCategory(categoryId);
                } else {
                    data = await productService.getAllProducts();
                }

                setProducts(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryId]);
    if (loading) {
        return <div className="text-center my-4">?ang t?i danh sách s?n ph?m th?i trang...</div>;
    }
    const API_URL = "https://localhost:7284";

    return (
        <div className="row">
            {products.length === 0 ? (
                <div className="col-12"><p className="text-muted">Ch?a có s?n ph?m nào trong h? th?ng.</p></div>
            ) : (
                products.map((item) => (
                    <div className="col-md-6 mb-4" key={item.id}>
                        <div className="card h-100 shadow-sm border">
                            <div className="card-body">
                                <img
                                    src={`${API_URL}${item.imageUrl}`}
                                    alt={item.name}
                                    style={{ width: '300px', height: 'auto' }}
                                />
                                <h5 className="card-title font-weight-bold text-dark">{item.name}</h5>
                                <p className="card-text text-danger font-weight-bold">
                                    {/* Hàm t? ??ng chuy?n s? thành ??nh d?ng ti?n t? Vi?t Nam (VND) */}
                                    Giá bán: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                                </p>
                                <p className="card-text small text-muted">Số lượng tồn kho: {item.stockQuantity} sản phẩm</p>
                            </div>
                            <div className="card-footer bg-transparent border-top-0">
                                <button
                                    className="btn btn-outline-primary btn-block btn-sm"
                                    onClick={() => navigate(`/product/${item.id}`)}
                                >
                                    <i className="fa-solid fa-eye mr-1"></i>
                                    Xem chi tiết
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ProductList;