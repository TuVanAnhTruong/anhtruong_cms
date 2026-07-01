import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';

function ProductSection({ title, fetchFunction,categoryId }) {
    const [products, setProducts] = useState([]);

    const API_URL = "https://localhost:7284";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetchFunction(categoryId);

                const list = res?.data || res || [];

                const formattedProducts = list.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    image: `${API_URL}${item.imageUrl}`,
                    isBestSeller: item.isBestSeller,
                    isNew: item.isNew,
                    discountPercent: item.discountPercent
                }));

                setProducts(formattedProducts);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

    }, [categoryId]); // ⭐ CHÌA KHÓA

    return (
        <div className="my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4
                    className="fw-bold m-0"
                    style={{
                        color: '#005088',
                        borderLeft: '4px solid #11CAA0',
                        paddingLeft: '10px'
                    }}
                >
                    {title}
                </h4>
            </div>

            <div className="row">
                {products.map(product => (
                    <div
                        key={product.id}
                        className="col-lg-3 col-md-4 col-sm-6 mb-4"
                    >
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductSection;