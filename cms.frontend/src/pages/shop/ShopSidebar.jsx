import React, { useState, useEffect } from 'react';
import categoryProductService from '../../services/categoryProductService';

function ShopSidebar({
    activeCategory,
    minPrice,
    maxPrice,
    onFilterChange
}) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);

                const response =
                    await categoryProductService.getAllCategoryProducts();

                setCategories(response.data || response);
            } catch (error) {
                console.error(
                    "Lỗi nạp danh mục sản phẩm:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div
            className="p-4"
            style={{
                background: "#fff",
                border: "1px solid #eee",
                position: "sticky",
                top: "100px"
            }}
        >
            {/* DANH MỤC */}
            <h6
                className="mb-4 pb-2"
                style={{
                    borderBottom: "1px solid #ddd",
                    letterSpacing: "2px",
                    fontSize: "13px",
                    fontWeight: "700"
                }}
            >
                DANH MỤC
            </h6>

            <div className="mb-4">

                {/* Tất cả sản phẩm */}
                <button
                    onClick={() =>
                        onFilterChange({
                            categoryProductId: null
                        })
                    }
                    className="w-100 text-start border-0 bg-transparent py-2"
                    style={{
                        color:
                            activeCategory === null
                                ? "#c8a75d"
                                : "#666",
                        fontWeight:
                            activeCategory === null
                                ? "600"
                                : "400",
                        transition: ".3s",
                        textAlign: "left",
                        display: "block"
                    }}
                >
                    Tất cả sản phẩm
                </button>

                {loading ? (
                    <div className="text-center py-3">
                        <div
                            className="spinner-border spinner-border-sm"
                            role="status"
                        ></div>
                    </div>
                ) : (
                    categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() =>
                                onFilterChange({
                                    categoryProductId: cat.id
                                })
                            }
                            className="w-100 text-start border-0 bg-transparent py-2"
                            style={{
                                color:
                                    activeCategory === cat.id
                                        ? "#c8a75d"
                                        : "#666",
                                fontWeight:
                                    activeCategory === cat.id
                                        ? "600"
                                        : "400",
                                transition: ".3s",
                                textAlign: "left",
                                display: "block"
                            }}
                        >
                            {cat.name}
                        </button>
                    ))
                )}
            </div>

            {/* KHOẢNG GIÁ */}
            <h6
                className="mb-4 mt-5 pb-2"
                style={{
                    borderBottom: "1px solid #ddd",
                    letterSpacing: "2px",
                    fontSize: "13px",
                    fontWeight: "700"
                }}
            >
                KHOẢNG GIÁ
            </h6>


            {/* GIỮ NGUYÊN LOGIC LỌC GIÁ */}
            <div>
                <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="Từ giá"
                    value={minPrice}
                    onChange={(e) =>
                        onFilterChange({
                            minPrice: e.target.value
                        })
                    }
                />

                <input
                    type="number"
                    className="form-control"
                    placeholder="Đến giá"
                    value={maxPrice}
                    onChange={(e) =>
                        onFilterChange({
                            maxPrice: e.target.value
                        })
                    }
                />
            </div>

            {/* XÓA LỌC */}
            <button
                className="btn w-100 mt-4"
                style={{
                    border: "1px solid #222",
                    background: "transparent",
                    letterSpacing: "2px",
                    padding: "12px",
                    fontWeight: "600"
                }}
                onClick={() =>
                    onFilterChange({
                        categoryProductId: null,
                        minPrice: '',
                        maxPrice: ''
                    })
                }
            >
                XÓA LỌC
            </button>
        </div>
    );
}

export default ShopSidebar;