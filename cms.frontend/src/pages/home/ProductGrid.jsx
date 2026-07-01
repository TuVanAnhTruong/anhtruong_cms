import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import productService from '../../services/productService';

function ProductGrid() {
    const [products, setProducts] = useState([]);

    const API_URL = "https://localhost:7284";

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const data = await productService.getFeaturedProducts();

                const formattedProducts = data.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    image: `${API_URL}${item.imageUrl}`,
                    isBestSeller: item.isBestSeller
                }));

                setProducts(formattedProducts);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFeaturedProducts();
    }, []);

    return (
        <div className="my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="text-center mb-5">
                    <p
                        style={{
                            color: "#c59d5f",
                            letterSpacing: "3px",
                            textTransform: "uppercase"
                        }}
                    >
                        Bộ sưu tập nổi bật
                    </p>

                    <h2
                        className="fw-bold"
                        style={{
                            fontSize: "40px"
                        }}
                    >
                        Sản Phẩm Nổi Bật
                    </h2>

                    <p className="text-muted">
                        Khám phá những mẫu kính được yêu thích nhất
                    </p>
                </div>

                <span
                    className="fw-bold"
                    style={{ color: '#11CAA0' }}
                >
                    {products.length} sản phẩm
                </span>
            </div>

            <div className="row">
                {products.map(product => (
                    <div
                        key={product.id}
                        className="col-lg-4 col-md-6 mb-4"
                    >
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductGrid;