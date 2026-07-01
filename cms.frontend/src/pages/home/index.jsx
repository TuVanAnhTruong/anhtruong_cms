import React, { useState } from 'react';
import HeroBanner from './HeroBanner';
import CategoryMenu from './CategoryMenu';
import ProductSection from './ProductSection';
import productService from '../../services/productService';
import Craftsmanship from './Craftsmanship';
import FeaturedCollections from './FeaturedCollections';

function Home() {

    // ⭐ state category filter
    const [selectedCategory, setSelectedCategory] = useState(0);

    return (
        <div className="homepage-wrapper">

            <HeroBanner />

            <div className="container my-4">

                <FeaturedCollections />
                <Craftsmanship />

                {/* ⭐ CATEGORY MENU */}
                <CategoryMenu
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />

                <ProductSection
                    title="SẢN PHẨM MỚI"
                    categoryId={selectedCategory}
                    fetchFunction={productService.getNewProducts}
                />

                <ProductSection
                    title="SẢN PHẨM BÁN CHẠY"
                    categoryId={selectedCategory}
                    fetchFunction={productService.getBestSellerProducts}
                />

                <ProductSection
                    title="SẢN PHẨM NỔI BẬT"
                    categoryId={selectedCategory}
                    fetchFunction={productService.getFeaturedProducts}
                />

                <ProductSection
                    title="SẢN PHẨM GIẢM GIÁ"
                    categoryId={selectedCategory}
                    fetchFunction={productService.getDiscountProducts}
                />

            </div>
        </div>
    );
}

export default Home;