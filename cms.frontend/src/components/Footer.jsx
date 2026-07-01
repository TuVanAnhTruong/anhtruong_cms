import React from "react";

const Footer = () => {
    return (
        <footer
            className="mt-5 pt-5"
            style={{
                backgroundColor: "#f8f6f2",
                borderTop: "1px solid #ddd"
            }}
        >
            <div className="container py-5">
                <div className="row g-4">

                    {/* Logo */}
                    <div className="col-lg-4 col-md-6">
                        <h3
                            className="fw-bold mb-3"
                            style={{
                                color: "#222",
                                fontFamily: "serif"
                            }}
                        >
                            Aura Luxury Optics
                        </h3>

                        <p className="text-muted">
                            Biểu tượng của sự tinh tế và đẳng cấp trong ngành kính mắt xa xỉ toàn cầu.
                        </p>

                        <div className="d-flex gap-3 mt-4">
                            <button
                                className="btn btn-outline-secondary rounded-circle"
                                style={{
                                    width: "45px",
                                    height: "45px"
                                }}
                            >
                                🌐
                            </button>

                            <button
                                className="btn btn-outline-secondary rounded-circle"
                                style={{
                                    width: "45px",
                                    height: "45px"
                                }}
                            >
                                📷
                            </button>
                        </div>
                    </div>

                    {/* Dịch vụ */}
                    <div className="col-lg-2 col-md-6">
                        <h5
                            className="fw-bold mb-4"
                            style={{
                                letterSpacing: "2px",
                                fontSize: "14px"
                            }}
                        >
                            DỊCH VỤ
                        </h5>

                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <a href="/" className="text-decoration-none text-muted">
                                    Privacy Policy
                                </a>
                            </li>

                            <li className="mb-2">
                                <a href="/" className="text-decoration-none text-muted">
                                    Terms of Service
                                </a>
                            </li>

                            <li className="mb-2">
                                <a href="/" className="text-decoration-none text-muted">
                                    Shipping & Returns
                                </a>
                            </li>

                            <li>
                                <a href="/" className="text-decoration-none text-muted">
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Cửa hàng */}
                    <div className="col-lg-3 col-md-6">
                        <h5
                            className="fw-bold mb-4"
                            style={{
                                letterSpacing: "2px",
                                fontSize: "14px"
                            }}
                        >
                            CỬA HÀNG
                        </h5>

                        <p className="text-muted mb-2">
                            Hà Nội: 123 Tràng Tiền
                        </p>

                        <p className="text-muted mb-2">
                            TP.HCM: 456 Lê Thánh Tôn
                        </p>

                        <p className="text-muted">
                            Đà Nẵng: 789 Võ Nguyên Giáp
                        </p>
                    </div>

                    {/* Newsletter */}
                    <div className="col-lg-3 col-md-6">
                        <h5
                            className="fw-bold mb-4"
                            style={{
                                letterSpacing: "2px",
                                fontSize: "14px"
                            }}
                        >
                            BẢN TIN AURA
                        </h5>

                        <p className="text-muted">
                            Đăng ký để nhận thông tin về bộ sưu tập mới nhất.
                        </p>

                        <div className="input-group">
                            <input
                                type="email"
                                className="form-control border-0 border-bottom bg-white"
                                placeholder="Email của bạn"
                            />

                            <button
                                className="btn"
                                style={{
                                    color: "#c8a75d"
                                }}
                            >
                                →
                            </button>
                        </div>
                    </div>

                </div>

                <hr className="my-5" />

                <div className="d-flex justify-content-between flex-wrap text-muted">
                    <p className="mb-0">
                        © 2026 Aura Luxury Optics. All rights reserved.
                    </p>

                    <span>VND - Tiếng Việt</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;