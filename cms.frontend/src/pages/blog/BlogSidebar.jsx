import React, { useState, useEffect } from 'react';
import blogService from '../../services/blogService';


function BlogSidebar({ activeCategory, onFilterChange }) {
    // 2. State lưu trữ danh sách danh mục nạp từ Database
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);


    // 3. useEffect gọi API ngay khi component vừa nạp lên màn hình
    useEffect(() => {
        const fetchCategoriesData = async () => {
            try {
                setLoading(true);
                const response = await blogService.getAllCategories();
                setCategories(response.data || response);
            } catch (error) {
                console.error("Thất bại khi lấy danh mục bài viết động:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategoriesData();
    }, []);


    return (
        <div className="mb-5">
            <div
                className="d-flex justify-content-between align-items-center mb-4 pb-3"
                style={{
                    borderBottom: "1px solid #dee2e6"
                }}
            >
                <h2
                    className="mb-0"
                    style={{
                        fontSize: "32px",
                        fontWeight: 600,
                        color: "#111"
                    }}
                >
                    Bài viết mới nhất
                </h2>

                <div
                    className="d-flex gap-4 overflow-auto"
                    style={{
                        whiteSpace: "nowrap"
                    }}
                >
                    {/* Tất cả */}
                    <button
                        onClick={() => onFilterChange(null)}
                        style={{
                            border: "none",
                            background: "transparent",
                            borderBottom:
                                activeCategory === null
                                    ? "2px solid #c59d5f"
                                    : "2px solid transparent",
                            color:
                                activeCategory === null
                                    ? "#c59d5f"
                                    : "#666",
                            paddingBottom: "8px",
                            fontSize: "13px",
                            fontWeight: 600,
                            letterSpacing: "1px",
                            textTransform: "uppercase",
                            transition: ".3s"
                        }}
                    >
                        Tất cả
                    </button>

                    {loading ? (
                        <div className="spinner-border spinner-border-sm text-warning" />
                    ) : (
                        categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() =>
                                    onFilterChange({ categoryId: cat.id })
                                }
                                style={{
                                    border: "none",
                                    background: "transparent",
                                    borderBottom:
                                        activeCategory === cat.id
                                            ? "2px solid #c59d5f"
                                            : "2px solid transparent",
                                    color:
                                        activeCategory === cat.id
                                            ? "#c59d5f"
                                            : "#666",
                                    paddingBottom: "8px",
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    letterSpacing: "1px",
                                    textTransform: "uppercase",
                                    transition: ".3s"
                                }}
                            >
                                {cat.name}
                            </button>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}


export default BlogSidebar;
