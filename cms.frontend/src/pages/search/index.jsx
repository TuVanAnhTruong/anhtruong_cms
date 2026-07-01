import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import productService from '../../services/productService';
import ProductCard from '../../components/ProductCard';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function SearchPage() {
    const query = useQuery();
    const keyword = query.get("keyword");

    const [products, setProducts] = useState([]);

    const API_URL = "https://localhost:7284";

    useEffect(() => {
        const fetchData = async () => {
            if (!keyword) return;

            try {
                const res = await productService.searchProducts(keyword);

                const list = res?.data || res || [];

                const formatted = list.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    image: `${API_URL}${item.imageUrl}`
                }));

                setProducts(formatted);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [keyword]);

    return (
        <div className="container my-4">
            <h4>Kết quả tìm kiếm: "{keyword}"</h4>

            <div className="row mt-3">
                {products.map(p => (
                    <div key={p.id} className="col-md-3 mb-3">
                        <ProductCard product={p} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchPage;