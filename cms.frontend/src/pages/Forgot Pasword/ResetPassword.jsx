import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import authService from "../../services/authService";


function ResetPassword() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();


    const email = searchParams.get("email");
    const token = searchParams.get("token");

    const [newPassword, setNewPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await authService.resetPassword({
                email: email,
                token: token,
                newPassword: newPassword
            });

            alert("Đổi mật khẩu thành công!");

            navigate("/login");

        } catch (err) {

            console.log(err.response?.data);

            alert(err.response?.data?.message || "Đổi mật khẩu thất bại");

        }
    };

    return (

        <div className="container mt-5" style={{ maxWidth: 400 }}>

            <h3 className="mb-4">
                Đổi mật khẩu
            </h3>

            <form onSubmit={handleSubmit}>

                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Nhập mật khẩu mới"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />

                <button
                    className="btn btn-success w-100"
                    type="submit"
                >
                    Xác nhận
                </button>

            </form>

        </div>

    );

}

export default ResetPassword;