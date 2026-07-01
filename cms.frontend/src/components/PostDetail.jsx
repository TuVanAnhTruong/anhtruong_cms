import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import blogService from "../services/blogService";

const IMAGE_BASE_URL = "https://localhost:7284";

function PostDetail() {
    const { id } = useParams();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPostDetailData = async () => {
            try {
                setLoading(true);

                const data = await blogService.getPostById(id);

                console.log("Post Detail:", data);

                setPost(data.data || data);
            } catch (error) {
                console.error("Lỗi lấy chi tiết bài viết:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPostDetailData();
    }, [id]);

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div
                    className="spinner-border text-primary"
                    role="status"
                ></div>
                <p className="text-muted mt-2">
                    Đang tải bài viết...
                </p>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="container py-5 text-center">
                <h5 className="text-danger">
                    ⛔ Bài viết không tồn tại
                </h5>

                <Link
                    to="/post"
                    className="btn btn-primary btn-sm mt-3"
                >
                    Quay lại danh sách Blog
                </Link>
            </div>
        );
    }

    // Sửa đường dẫn ảnh trong nội dung CKEditor
    const contentWithImages =
        post.content?.replace(
            /src="\/(.*?)"/g,
            `src="${IMAGE_BASE_URL}/$1"`
        ) || "";

    return (
        <div className="blog-detail-page bg-light py-4">
            <div className="container mt-3">

                {/* Breadcrumb */}
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb bg-transparent p-0 small">
                        <li className="breadcrumb-item">
                            <Link to="/">Trang Chủ</Link>
                        </li>

                        <li className="breadcrumb-item">
                            <Link to="/post">Tin tức</Link>
                        </li>

                        <li
                            className="breadcrumb-item active text-truncate"
                            aria-current="page"
                            style={{ maxWidth: "300px" }}
                        >
                            {post.title}
                        </li>
                    </ol>
                </nav>

                <div className="row justify-content-center mt-4">
                    <article
                        className="col-lg-9 col-md-11 bg-white p-4 p-md-5 rounded shadow-sm"
                        style={{
                            borderTop: "4px solid #005088"
                        }}
                    >
                        {/* Tiêu đề */}
                        <h1
                            className="font-weight-bold text-dark mb-3"
                            style={{
                                fontSize: "30px",
                                lineHeight: "1.4"
                            }}
                        >
                            {post.title}
                        </h1>

                        {/* Ảnh đại diện nếu có */}
                        {post.imageUrl && (
                            <div className="mb-4">
                                <img
                                    src={`${IMAGE_BASE_URL}${post.imageUrl}`}
                                    alt={post.title}
                                    style={{
                                        width: "100%",
                                        maxHeight: "500px",
                                        objectFit: "cover",
                                        borderRadius: "10px"
                                    }}
                                />
                            </div>
                        )}

                        {/* Metadata */}
                        <div
                            className="d-flex align-items-center flex-wrap text-muted small pb-3 mb-4 border-bottom"
                            style={{ gap: "15px" }}
                        >
                            <span>
                                <i className="far fa-calendar-alt mr-1"></i>
                                {post.createdDate
                                    ? new Date(
                                        post.createdDate
                                    ).toLocaleDateString("vi-VN")
                                    : "Mới cập nhật"}
                            </span>

                            <span>
                                <i className="far fa-user mr-1"></i>
                                Tác giả: Biên tập viên
                            </span>

                            <span>
                                <i className="far fa-eye mr-1"></i>
                                Lượt xem: 525 lượt
                            </span>
                        </div>

                        {/* Summary */}
                        {post.summary && (
                            <div
                                className="p-3 bg-light mb-4 font-italic text-secondary"
                                style={{
                                    borderLeft: "4px solid #0d6efd",
                                    borderRadius: "0 8px 8px 0"
                                }}
                            >
                                {post.summary}
                            </div>
                        )}

                        {/* Nội dung CKEditor */}
                        <div
                            className="blog-main-render-content text-secondary"
                            style={{
                                fontSize: "16.5px",
                                lineHeight: "1.8"
                            }}
                            dangerouslySetInnerHTML={{
                                __html: contentWithImages
                            }}
                        />

                        {/* Footer */}
                        <div className="border-top mt-5 pt-4 d-flex justify-content-between align-items-center">
                            <Link
                                to="/post"
                                className="btn btn-light btn-sm border"
                            >
                                <i className="fas fa-chevron-left mr-1"></i>
                                Quay lại mục Tin tức
                            </Link>

                            <span className="small text-muted">
                                Mã bản tin: #{post.id}
                            </span>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
}

export default PostDetail;