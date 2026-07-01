import axiosClient from '../api/axiosClient';

const productService = {
    // Hàm gọi API lấy toàn bộ danh sách quần áo, váy dạ hội
    getAllProducts: async (filters = {}) => { // Nhận thêm tham số filters
        try {
            // Truyền filters vào mục params để Axios tự băm thành Query String (?categoryId=1...)
            const response = await axiosClient.get('/Products', { params: filters });
            return response.data || response;
        } catch (error) {
            console.error("Lỗi API getAllProducts:", error);
            throw error;
        }
    },
    getProductById: async (id) => {
        try {
            const response = await axiosClient.get(`/Products/${id}`);
            return response.data || response;
        } catch (error) {
            console.error(`Lỗi API getProductById với ID ${id}:`, error);
            throw error;
        }
    },
    getProductsByCategory: (categoryId) => {
        return axiosClient.get(`/Products/categoriesproduct/${categoryId}`);
    },
    getNewProducts: (categoryId = 0) => {
        return axiosClient.get('/Products/new', {
            params: { categoryProductId: categoryId }
        });
    },

    getBestSellerProducts: (categoryId = 0) => {
        return axiosClient.get('/Products/bestseller', {
            params: { categoryProductId: categoryId }
        });
    },

    getFeaturedProducts: (categoryId = 0) => {
        return axiosClient.get('/Products/featured', {
            params: { categoryProductId: categoryId }
        });
    },

    getDiscountProducts: (categoryId = 0) => {
        return axiosClient.get('/Products/discount', {
            params: { categoryProductId: categoryId }
        });
    },


    /**
     * Hàm đẩy hóa đơn chốt đơn hàng xuống API
     * Payload chứa: { customerId, notes, orderDetails: [{ productId, quantity, unitPrice }] }
     */
    checkoutOrder: async (orderPayload) => {
        try {
            const response = await axiosClient.post("/Order", orderPayload);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    getOrdersByCustomer(customerId) {
        return axiosClient.get(`/Order/customer/${customerId}`);
    },
    searchProducts: (keyword) => {
        return axiosClient.get('/Products/search', {
            params: { keyword }
        });
    },
};


export default productService;