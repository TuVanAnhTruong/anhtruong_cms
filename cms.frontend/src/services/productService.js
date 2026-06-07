import axiosClient from '../api/axiosClient';

const productService = {
    // Hàm gọi API lấy toàn bộ danh sách quần áo, váy dạ hội
    getAllProducts: () => {
        const url = '/Products'; // Phải khớp chính xác với Router trong ProductsController phía Backend
        return axiosClient.get(url);
    },
    getProductById: (id) => {
        return axiosClient.get(`/Products/${id}`);
    },
    getProductsByCategory: (categoryId) => {
        return axiosClient.get(`/Products/categoriesproduct/${categoryId}`);
    }
};

export default productService;