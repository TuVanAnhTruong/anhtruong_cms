import React, { useState } from "react";
import authService from "../../services/authService";
import { useNavigate } from "react-router-dom";


function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const res = await authService.forgotPassword(email);

            alert("Tạo link reset thành công");

            // Chuyển sang đúng link backend trả về
            window.location.href = res.resetLink;

        } catch (err) {
            console.log(err);
            alert("Gửi thất bại");
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "400px" }}>
            <h3>Quên mật khẩu</h3>

            <form onSubmit={handleSubmit}>
                <input
                    className="form-control my-3"
                    placeholder="Nhập email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button className="btn btn-primary w-100">
                    Gửi
                </button>
            </form>

            {/* HIỂN THỊ THÔNG BÁO */}
            {message && (
                <div className="alert alert-info mt-3">
                    {message}
                </div>
            )}
        </div>
    );
}

export default ForgotPassword;