import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CategoryMenu({ selectedCategory, setSelectedCategory }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🎯 ICON mapping theo loại kính
    const categoryIcons = {
        1: "👓", // Gọng kính
        2: "🏃‍♂️", // Kính thể thao
        3: "🕶️"  // Kính râm
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(
                    "https://localhost:7284/api/CategoriesProduct"
                );

                const data = [
                    { id: 0, name: "Tất cả sản phẩm" },
                    ...res.data
                ];

                setCategories(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) return <div>Đang tải danh mục...</div>;

    return (
        <div className="my-5 text-center">
            <h3 className="font-weight-bold mb-4" style={{ color: '#005088' }}>
                KHÁM PHÁ DANH MỤC
            </h3>

            <div className="d-flex flex-wrap justify-content-center" style={{ gap: '20px' }}>
                {categories.map((cat) => (
                    <div
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}   // ⭐ FIX QUAN TRỌNG
                        style={{ width: '120px', cursor: 'pointer' }}
                    >
                        {/* CIRCLE ICON */}
                        <div
                            style={{
                                width: '90px',
                                height: '90px',
                                borderRadius: '50%',
                                margin: '0 auto',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '38px',
                                backgroundColor:
                                    selectedCategory === cat.id
                                        ? '#005088'
                                        : '#f1f3f5',
                                color:
                                    selectedCategory === cat.id
                                        ? '#fff'
                                        : '#333',
                                boxShadow:
                                    selectedCategory === cat.id
                                        ? '0 6px 12px rgba(0,80,136,0.25)'
                                        : 'none',
                                transition: '0.2s'
                            }}
                        >
                            {/* ICON */}
                            {cat.id === 0
                                ? "🛍️"
                                : categoryIcons[cat.id] || "👓"}
                        </div>

                        {/* NAME */}
                        <div style={{ marginTop: '8px', fontWeight: '600' }}>
                            {cat.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryMenu;