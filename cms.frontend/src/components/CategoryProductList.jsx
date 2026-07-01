import React, { useState, useEffect } from 'react';
import categoryProductService from '../services/categoryProductService';

const CategoryProductList = ({ onSelectCategory }) => {
    // 1. Khai báo state để lưu trữ danh sách danh mục SẢN PHẨM trả về từ API
    const [categoryProducts, setCategoryProducts] = useState([]);

    // 2. State quản lý trạng thái hiển thị loading (hiệu ứng chờ) trong lúc đợi API phản hồi
    const [loading, setLoading] = useState(true);

    // 3. useEffect tự động chạy một lần duy nhất sau khi Component được mount vào giao diện
    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {
                setLoading(true);
                // Gọi sang lớp Service để thực hiện Request HTTP GET đến API Backend
                const data = await categoryProductService.getAllCategoryProducts();

                // Cập nhật mảng dữ liệu nhận được vào State
                setCategoryProducts(data);
            } catch (error) {
                console.error("Lỗi khi tải danh mục sản phẩm:", error);
            } finally {
                // Tắt trạng thái loading dù API chạy thành công hay thất bại
                setLoading(false);
            }
        };

        fetchCategoryProducts();
    }, []); // Mảng phụ thuộc rỗng [] đảm bảo hàm này không bị gọi lặp vô hạn

    // 4. Xử lý giao diện tạm thời trong lúc hệ thống đang tải dữ liệu
    if (loading) {
        return <div className="text-center my-4">Đang tải danh mục sản phẩm...</div>;
    }

    // 5. Render cấu trúc giao diện danh mục sản phẩm ra HTML
    return (
        <div className="my-5 text-center">

            <h3
                className="font-weight-bold mb-4"
                style={{ color: '#005088' }}
            >
                DANH MỤC SẢN PHẨM
            </h3>

            <div
                className="d-flex flex-wrap justify-content-center"
                style={{ gap: '15px' }}
            >

                {/* Nút tất cả sản phẩm */}
                <button
                    onClick={() => onSelectCategory(null)}
                    className="btn font-weight-bold px-4 py-2"
                    style={{
                        borderRadius: '25px',
                        border: '1px solid #dee2e6',
                        backgroundColor: '#fff'
                    }}
                >
                    Tất cả sản phẩm
                </button>

                {/* Danh mục từ API */}
                {categoryProducts.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onSelectCategory(item.id)}
                        className="btn font-weight-bold px-4 py-2"
                        style={{
                            borderRadius: '25px',
                            border: '1px solid #dee2e6',
                            backgroundColor: '#fff'
                        }}
                    >
                        {item.name}
                    </button>
                ))}
            </div>

        </div>
    );
};

export default CategoryProductList;

