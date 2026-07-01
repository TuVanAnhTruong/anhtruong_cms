//import React, { useState, useEffect } from "react";
//import { Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
function Header() {
    const location = useLocation();
    const customerString = localStorage.getItem("customer");
    const customer = customerString ? JSON.parse(customerString) : null;
    const [showMenu, setShowMenu] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const handleLogoutSubmit = (e) => {
        e.preventDefault();

        localStorage.removeItem("customer");

        alert("Đăng xuất thành công!");

        window.location.href = "/login";
    };
    const loadCartCount = () => {

        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        const total = cart.reduce(
            (sum, item) => sum + item.quantity,
            0
        );

        setCartCount(total);
    };
    useEffect(() => {

        loadCartCount();

        window.addEventListener("cartUpdated", loadCartCount);

        return () => {
            window.removeEventListener("cartUpdated", loadCartCount);
        };

    }, []);

    const isActive = (path) => location.pathname === path ? 'text-primary font-weight-bold' : 'text-dark';
    const handleSearch = (e) => {
        e.preventDefault();

        if (!keyword.trim()) return;

        navigate(`/search?keyword=${keyword}`);
    };

    return (
        <header
            className="sticky-top bg-white"
            style={{
                backdropFilter: "blur(10px)",
                borderBottom: "1px solid #eee",
                zIndex: 999
            }}
        >
            <div className="container">
                <nav
                    className="d-flex justify-content-between align-items-center"
                    style={{
                        height: "80px"
                    }}
                >
                    {/* Logo */}
                    <div className="d-flex align-items-center">
                        <Link
                            to="/"
                            className="text-decoration-none fw-bold"
                            style={{
                                fontSize: "30px",
                                color: "#222",
                                letterSpacing: "-1px",
                                fontFamily: "Playfair Display, serif"
                            }}
                        >
                            Aura Luxury Optics
                        </Link>
                    </div>

                    <form
                        onSubmit={handleSearch}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "30px",
                            flex: 1,
                            maxWidth: "400px"
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "8px 12px",
                                borderRadius: "20px",
                                border: "1px solid #ddd"
                            }}
                        />

                        <button
                            type="submit"
                            style={{
                                marginLeft: "8px",
                                padding: "8px 14px",
                                borderRadius: "20px",
                                background: "#c8a75d",
                                border: "none",
                                color: "#fff"
                            }}
                        >
                            🔍
                        </button>
                    </form>

                    {/* Menu */}
                    <div className="d-none d-md-flex align-items-center">
                        <ul
                            className="d-flex mb-0"
                            style={{
                                listStyle: "none",
                                gap: "35px"
                            }}
                        >
                            <li>
                                <Link
                                    to="/"
                                    className="text-decoration-none"
                                    style={{
                                        color: location.pathname === "/"
                                            ? "#c8a75d"
                                            : "#555",
                                        fontWeight: 500
                                    }}
                                >
                                    Trang Chủ
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/shop"
                                    className="text-decoration-none"
                                    style={{
                                        color: location.pathname === "/shop"
                                            ? "#c8a75d"
                                            : "#555",
                                        fontWeight: 500
                                    }}
                                >
                                    Sản Phẩm
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/collection"
                                    className="text-decoration-none"
                                    style={{
                                        color: "#555"
                                    }}
                                >
                                    Bộ Sưu Tập
                                </Link>
                            </li>

                            {/*<li>*/}
                            {/*    <Link*/}
                            {/*        to="/brand"*/}
                            {/*        className="text-decoration-none"*/}
                            {/*        style={{*/}
                            {/*            color: "#555"*/}
                            {/*        }}*/}
                            {/*    >*/}
                            {/*        Thương Hiệu*/}
                            {/*    </Link>*/}
                            {/*</li>*/}

                            <li>
                                <Link
                                    to="/post"
                                    className="text-decoration-none"
                                    style={{
                                        color: location.pathname === "/post"
                                            ? "#c8a75d"
                                            : "#555"
                                    }}
                                >
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Action */}
                    <div className="d-flex align-items-center gap-4">

                        {
                            customer ? (
                                <div
                                    className="position-relative mr-4"
                                    onMouseLeave={() => setShowMenu(false)}
                                >
                                    <button
                                        type="button"
                                        className="btn p-0 border-0 bg-transparent"
                                        onClick={() => setShowMenu(!showMenu)}
                                        style={{
                                            color: "#222",
                                            fontSize: "20px",
                                            boxShadow: "none"
                                        }}
                                    >
                                        <i className="far fa-user"></i>
                                    </button>

                                    {showMenu && (
                                        <div
                                            className="dropdown-menu dropdown-menu-right shadow show"
                                            style={{
                                                display: "block",
                                                right: 0,
                                                left: "auto",
                                                minWidth: "220px"
                                            }}
                                        >
                                            <div
                                                className="dropdown-item-text font-weight-bold"
                                                style={{ color: "#c8a75d" }}
                                            >
                                                Xin chào<br />
                                                {customer.fullName}
                                            </div>

                                            <div className="dropdown-divider"></div>

                                            <Link
                                                className="dropdown-item"
                                                to="/profile"
                                                onClick={() => setShowMenu(false)}
                                            >
                                                <i className="far fa-id-card mr-2"></i>
                                                Hồ sơ cá nhân
                                            </Link>

                                            <Link
                                                className="dropdown-item"
                                                to="/my-orders"
                                                onClick={() => setShowMenu(false)}
                                            >
                                                <i className="fas fa-box mr-2"></i>
                                                Đơn hàng của tôi
                                            </Link>

                                            <div className="dropdown-divider"></div>

                                            <button
                                                className="dropdown-item text-danger"
                                                onClick={handleLogoutSubmit}
                                            >
                                                <i className="fas fa-sign-out-alt mr-2"></i>
                                                Đăng xuất
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    className="text-decoration-none mr-4"
                                    style={{
                                        color: "#222",
                                        fontSize: "20px"
                                    }}
                                >
                                    <i className="far fa-user"></i>
                                </Link>
                            )
                        }

                        <Link
                            to="/cart"
                            className="position-relative text-decoration-none"
                            style={{
                                color: "#222",
                                fontSize: "20px"
                            }}
                        >
                            <i className="fas fa-shopping-bag"></i>

                            <span
                                className="position-absolute rounded-circle text-white d-flex align-items-center justify-content-center"
                                style={{
                                    top: "-6px",
                                    right: "-10px",
                                    width: "18px",
                                    height: "18px",
                                    fontSize: "10px",
                                    backgroundColor: "#c8a75d"
                                }}
                            >
                                {cartCount}
                            </span>
                        </Link>

                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;