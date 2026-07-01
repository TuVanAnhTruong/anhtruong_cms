// Import cấu hình axiosClient dùng chung từ thư mục api
import axiosClient from '../api/axiosClient';

const authService = {
    /**
     * 1. Hàm gửi yêu cầu đăng ký tài khoản khách hàng mới
     * Endpoint này kết nối tới CustomerController trong ASP.NET Core
     */
    register: async (customerData) => {
        try {
            const url = '/Customer/register';
            const response = await axiosClient.post(url, customerData);
            return response.data || response;
        } catch (error) {
            console.error("Lỗi API register:", error);
            throw error;
        }
    },


    /**
     * 2. Hàm gửi yêu cầu xác thực đăng nhập tài khoản
     */
    login: async (credentials) => {
        try {
            const url = '/Customer/login';
            // Gửi Email và Mật khẩu xuống API Backend để xác thực quyền truy cập
            const response = await axiosClient.post(url, credentials);
            return response.data || response;
        } catch (error) {
            console.error("Lỗi API login:", error);
            throw error;
        }
    },
    forgotPassword: (email) => {
        return axiosClient.post("/Customer/forgot-password", email, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    },

    resetPassword: (data) => {
        return axiosClient.post("/Customer/reset-password", data);
    }
};


// Xuất mặc định đối tượng này để các trang Auth import vào không bị lỗi 'default was not found'
export default authService;
