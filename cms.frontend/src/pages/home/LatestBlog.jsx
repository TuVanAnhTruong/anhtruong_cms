import React from 'react';

function LatestBlog() {
    // Giả lập dữ liệu bài viết lấy từ API /api/Posts
    const mockBlogs = [
        { id: 1, title: "Tips chọn váy trắng 'hack dáng' từ A đến Z cho quý cô công sở", date: "11/06/2026", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80", desc: "Khám phá bí quyết lựa chọn trang phục phù hợp với vóc dáng để luôn tự tin tỏa sáng nơi làm việc..." },
        { id: 2, title: "Top 7 kiểu áo sơ mi sang chảnh tôn dáng cho nàng công sở năm 2026", date: "09/06/2026", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80", desc: "Sơ mi luôn là món đồ không thể thiếu. Điểm danh ngay những thiết kế sơ mi lụa Premium đang làm mưa làm gió..." }
    ];

    return (
        <div className="my-5">
            <div className="text-center mb-4">
                <h4 className="font-weight-bold mb-1" style={{ color: '#005088' }}>XU HƯỚNG THỜI TRANG</h4>
                <p className="text-muted small">Cập nhật những mẹo phối đồ và tin tức phong cách mới nhất cùng ThaiCMS</p>
            </div>
            <div className="row justify-content-center">
                {mockBlogs.map(blog => (
                    <div key={blog.id} className="col-md-6 mb-4">
                        <div className="card h-100 border-0 shadow-sm d-flex flex-row p-3" style={{ borderRadius: '12px' }}>
                            <img src={blog.image} alt={blog.title} style={{ width: '130px', height: '130px', objectFit: 'cover', borderRadius: '8px' }} />
                            <div className="ml-3 d-flex flex-column justify-content-between">
                                <div>
                                    <small className="text-muted"><i className="far fa-calendar-alt mr-1"></i> {blog.date}</small>
                                    <h6 className="font-weight-bold text-dark my-1" style={{ fontSize: '14px', lineHeight: '1.4' }}>{blog.title}</h6>
                                    <p className="text-muted small mb-0 text-truncate-2">{blog.desc}</p>
                                </div>
                                <a href={`/blog/${blog.id}`} className="text-decoration-none font-weight-bold small mt-2" style={{ color: '#11CAA0' }}>
                                    Đọc bài viết <i className="fas fa-long-arrow-alt-right ml-1"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LatestBlog;