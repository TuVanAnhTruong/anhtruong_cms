import axiosClient from '../api/axiosClient';

const blogService = {
    /**
     * 1. Lấy danh sách toàn bộ bài viết tin tức xu hướng (Hỗ trợ truyền tham số lọc ngầm)
     * API Endpoint: GET https://localhost:7111/api/Posts
     */
    getAllPosts: async (filters = {}) => { // Nhận thêm tham số filters để lọc động
        try {
            // Truyền filters vào mục params để Axios tự băm thành Query String (?categoryPostId=1)
            const response = await axiosClient.get('/Posts', { params: filters });
            return response.data || response;
        } catch (error) {
            console.error("Lỗi API getAllPosts:", error);
            throw error;
        }
    },


    /**
      * 3. CODE BỔ SUNG: Lấy toàn bộ danh mục bài viết thật từ SQL Server
      * API Endpoint: GET https://localhost:7111/api/CategoryPosts
      */
    getAllCategories: async () => {
        try {
            const response = await axiosClient.get('/CategoryPosts');
            return response.data || response; // Trả về mảng danh mục động
        } catch (error) {
            console.error("Lỗi API getAllCategories:", error);
            throw error;
        }
    }
,
    /**
     * 2. Lấy thông tin chi tiết độc bản của một bài viết theo ID khóa chính
     */
    getPostById: async (id) => {
        try {
            const response = await axiosClient.get(`/Posts/${id}`);
            return response.data || response;
        } catch (error) {
            console.error(`Lỗi API getPostById với ID ${id}:`, error);
            throw error;
        }
    }
};

export default blogService;
