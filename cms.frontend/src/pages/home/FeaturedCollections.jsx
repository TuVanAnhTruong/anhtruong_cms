import React from "react";
import "./FeaturedCollections.css";
import { useNavigate } from "react-router-dom";
function FeaturedCollections() {
    const navigate = useNavigate();
    return (
        <section className="featured-collections py-5">
            <div className="container">

                <div className="text-center mb-5">
                    <h2 className="fw-bold">BỘ SƯU TẬP NỔI BẬT</h2>
                    <div className="title-line mx-auto"></div>
                </div>

                <div className="row g-4">

                    {/* Kính Mát */}
                    <div className="col-lg-8">
                        <div
                            className="collection-card large-card"
                            onClick={() => navigate("/collection")}
                            style={{
                                cursor: "pointer",
                                backgroundImage:
                                    "url('https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1400')",
                            }}
                        >
                            <div className="overlay"></div>

                            <div className="card-content">
                                <h3>Kính Mát</h3>

                                <p>
                                    Bảo vệ mắt tối ưu với phong cách thời thượng.
                                </p>

                                <span>KHÁM PHÁ</span>
                            </div>
                        </div>
                    </div>

                    {/* Kính Cận */}
                    <div className="col-lg-4">
                        <div
                            className="collection-card large-card"
                            onClick={() => navigate("/collection")}
                            style={{
                                cursor: "pointer",
                                backgroundImage:
                                    "url('https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=1200')",
                            }}
                        >
                            <div className="overlay"></div>

                            <div className="card-content">
                                <h3>Kính Cận</h3>

                                <p>
                                    Tinh tế trong từng đường nét.
                                </p>

                                <span>KHÁM PHÁ</span>
                            </div>
                        </div>
                    </div>

                    {/* Kính Thể Thao */}
                    <div className="col-12">
                        <div
                            className="collection-card sport-card"
                            onClick={() => navigate("/collection")}
                            style={{
                                cursor: "pointer",
                                backgroundImage:
                                    "url('https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=1400')",
                            }}
                        >
                            <div className="overlay-horizontal"></div>

                            <div className="card-content middle-content">
                                <h3>Kính Thể Thao</h3>

                                <p>
                                    Năng động và bền bỉ trong mọi điều kiện.
                                </p>

                                <span>KHÁM PHÁ</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default FeaturedCollections;