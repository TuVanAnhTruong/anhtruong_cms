//import CategoryProductList from './components/CategoryProductList';
//import ProductList from './components/ProductList';
//import PostList from './components/PostList'; // Nhớ thêm dòng import này để kích hoạt phần tin tức
//import BlogCategoryList from './components/BlogCategoryList';
//import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import ProductDetail from './components/ProductDetail';
//import PostDetail from './components/PostDetail';
//import React, { useState } from 'react';
//function HomePage() {
//    const [selectedCategory, setSelectedCategory] = useState(null);
//    return (
//        <div className="container mt-5">
//            <header className="pb-3 mb-4 border-bottom">
//                <span className="fs-4 font-weight-bold text-dark">
//                    👗 FASHION BOUTIQUE - THỜI TRANG CÔNG SỞ & DẠ HỘI
//                </span>
//            </header>

//            {/* KHU VỰC 1: SHOPPING (Sản phẩm và Bộ lọc danh mục sản phẩm) */}
//            <div className="row">
//                <div className="col-md-4">
//                    <CategoryProductList
//                        onSelectCategory={setSelectedCategory}
//                    />
//                    <BlogCategoryList /> {/* Thêm chuyên mục tin tức vào sidebar bên trái */}
//                </div>
//                <div className="col-md-8">
//                    <h4 className="mb-4 text-uppercase text-secondary font-weight-bold">Bộ sưu tập mới nhất</h4>
//                    <ProductList
//                        categoryId={selectedCategory}
//                    />
//                </div> 
//            </div>

//            {/* KHU VỰC 2: BLOG & BLOG CATEGORIES (Tin tức thời trang công sở, dạ hội) */}
//            <div className="row mt-5">
//                <div className="col-12">
//                    <PostList />
//                </div>
//            </div>
//        </div>
//    );
//}
//function App() {
//    return (
//        <BrowserRouter>
//            <Routes>
//                <Route path="/" element={<HomePage />} />
//                <Route path="/product/:id" element={<ProductDetail />} />
//                <Route path="/post/:id" element={<PostDetail />} />
//            </Routes>
//        </BrowserRouter>
//    );
//}
//export default App;
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/index';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
//import PostList from './components/PostList'; // Nhớ thêm dòng import này để kích hoạt phần tin tức
import PostDetail from './components/PostDetail';
import Header from './components/Header';
import Footer from './components/Footer';
import Shop from './pages/shop/index';
import Blog from './pages/blog/index';
import Collections from './pages/Collections';
import CartPage from './pages/cart/CartPage';
import RegisterPage from './pages/register/index';
import Login from './pages/login/index';
import Profile from './pages/auth/Profile';
import Checkout from './pages/checkout/index';
import SearchPage from './pages/search/index';
import ForgotPassword from './pages/Forgot Pasword/ForgotPassword';
import ResetPassword from './pages/Forgot Pasword/ResetPassword';
import MyOrders from './pages/order/MyOrders';

function App() {
    return (
        <BrowserRouter>
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/post" element={<Blog />} />
                <Route path="/post/:id" element={<PostDetail />} />
                <Route path="/collection" element={<Collections />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route
                    path="/my-orders"
                    element={<MyOrders />}
                />
            </Routes>

            <Footer />
        </BrowserRouter>
    );
}

export default App;