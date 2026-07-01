import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../../services/authService';

function Login() {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await authService.login(credentials);
            const data = response.data || response;

            localStorage.setItem('customer', JSON.stringify(data));

            alert(`🎉 XÁC THỰC THÀNH CÔNG: Chào mừng ${data.fullName} đã đăng nhập hệ thống!`);

            navigate('/');
            window.location.reload();
        } catch (error) {
            alert("⛔ ĐĂNG NHẬP THẤT BẠI: Sai tài khoản Email hoặc Mật khẩu không chính xác!");
        }
    };

    return (
        <div className="container py-5">

            <div className="row justify-content-center py-5">
                <div className="col-md-4 col-sm-8">

                    <div className="card shadow-lg border-0 p-4" style={{ borderRadius: '15px' }}>

                        <div className="text-center mb-4">
                            <div className="icon-wrapper text-primary mb-2" style={{ fontSize: '50px' }}>
                                <i className="fas fa-user-shield"></i>
                            </div>

                            <h4 className="font-weight-bold text-uppercase m-0" style={{ color: '#005088' }}>
                                ĐĂNG NHẬP HỆ THỐNG
                            </h4>
                        </div>

                        <form onSubmit={handleLoginSubmit}>

                            <div className="form-group mb-3">
                                <label className="small font-weight-bold text-secondary">TÀI KHOẢN EMAIL</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="example@gmail.com"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group mb-4">
                                <label className="small font-weight-bold text-secondary">MẬT KHẨU</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="******"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary btn-block w-100 py-2 font-weight-bold"
                                style={{ backgroundColor: '#005088', borderColor: '#005088', borderRadius: '8px' }}
                            >
                                ĐĂNG NHẬP
                            </button>

                        </form>

                        {/* 🔥 THÊM PHẦN NÀY */}
                        <div className="d-flex justify-content-between mt-3 small">

                            <Link
                                to="/forgot-password"
                                style={{
                                    color: "#005088",
                                    textDecoration: "none",
                                    fontWeight: "500"
                                }}
                            >
                                Quên mật khẩu?
                            </Link>

                            <Link
                                to="/register"
                                style={{
                                    color: "#005088",
                                    textDecoration: "none",
                                    fontWeight: "500"
                                }}
                            >
                                Tạo tài khoản
                            </Link>

                        </div>

                    </div>

                </div>
            </div>

        </div>
    );
}

export default Login;