import React, { useState, useEffect } from 'react';
import PostList from '../../components/PostList';
import BlogSidebar from './BlogSidebar';
import blogService from '../../services/blogService';
import BlogHeroBanner from './BlogHeroBanner';


function Blog() {
    // State 1: Mảng lưu danh sách bài viết thời trang đổ ra ô lưới
    const [posts, setPosts] = useState([]);
    // State 2: Quản lý trạng thái chờ xoay mạng (UX)
    const [loading, setLoading] = useState(true);


    // State 3: Quản lý ID danh mục bài viết đang chọn (Mặc định bằng null - lấy tất cả)
    const [filters, setFilters] = useState({
        categoryId: null,   // Mặc định null là lấy tất cả danh mục
        keyword: ''         // Từ khóa tìm kiếm rỗng
    });


    // useEffect theo dõi biến filter tự động kích hoạt gọi lại API mỗi khi chọn lại 1 category 
    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                setLoading(true);


                // Đóng gói tham số lọc động gửi xuống Web API Backend C#
                //const filters = {
                //    categoryId: selectedCategory
                //};


                // Gọi dịch vụ lấy danh sách bài viết kèm tham số lọc gửi xuống SQL Server
                const response = await blogService.getAllPosts(filters);
                setPosts(response.data || response); // Cập nhật mảng bài viết mới
            } catch (error) {
                console.error("Lỗi nạp dữ liệu phân hệ Blog:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogData();
    }, [filters]); // Theo dõi sát sao biến filters
    // Hàm CallBack truyền xuống cho các con kích hoạt khi người dùng thao tác
    const handleFilterUpdate = (newFields) => {
        setFilters(prev => ({
            ...prev,
            ...newFields // Gộp đè các trường lọc mới vào trạng thái cũ
        }));
    };





    return (
        <div className="container py-4">
            {/* Khối tiêu đề trang */}    
                <BlogHeroBanner />
 
            {/* BỐ CỤC CHIA 2 CỘT DỌC CHUẨN BOOTSTRAP 4 */}
            <div className="mt-4">

                {/* Thanh danh mục nằm ngang */}
                <BlogSidebar
                    activeCategory={filters.categoryId}
                    onFilterChange={handleFilterUpdate}
                />

                {/* Danh sách bài viết */}
                <div className="mt-4">
                    {loading ? (
                        <div className="text-center py-5">
                            <div
                                className="spinner-border text-primary"
                                role="status"
                            ></div>
                            <p className="mt-2 text-muted small fst-italic">
                                Đang nạp cẩm nang thời trang...
                            </p>
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="text-center py-5 bg-white border rounded">
                            <i className="fas fa-folder-open fa-2x text-muted mb-2"></i>
                            <p className="text-muted m-0 fst-italic small">
                                Chủ đề này hiện chưa có bài viết nào được xuất bản.
                            </p>
                        </div>
                    ) : (
                        <PostList posts={posts} />
                    )}
                </div>

            </div>
        </div>
    );
}


export default Blog;
