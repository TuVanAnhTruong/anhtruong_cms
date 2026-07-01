import React, { useState, useEffect } from 'react';
import blogService from '../services/blogService';
import { useNavigate } from 'react-router-dom';
import PostCard from './PostCard';

const PostList = () => {
    // State chứa danh sách bài viết
    const [posts, setPosts] = useState([]);

    // State loading
    const [loading, setLoading] = useState(true);

    // State phân trang
    const [currentPage, setCurrentPage] = useState(1);

    const postsPerPage = 3;

    const API_URL = "https://localhost:7284";
    const navigate = useNavigate();

    // Lấy dữ liệu bài viết
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);

                const data = await blogService.getAllPosts();

                setPosts(data);
            } catch (error) {
                console.error(
                    "Quá trình kết nối API bài viết thất bại:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    // Khi dữ liệu thay đổi thì quay về trang đầu
    useEffect(() => {
        setCurrentPage(1);
    }, [posts]);

    // Tính toán phân trang
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    const currentPosts = posts.slice(
        indexOfFirstPost,
        indexOfLastPost
    );

    const totalPages = Math.ceil(posts.length / postsPerPage);

    // Loading
    if (loading) {
        return (
            <div className="text-center my-5">
                <div
                    className="spinner-border text-info"
                    role="status"
                ></div>

                <p className="mt-2 text-muted">
                    Đang kết nối Database lấy tin tức thời trang...
                </p>
            </div>
        );
    }

    return (
        <div className="my-5">
            {posts.length === 0 ? (
                <div className="alert alert-light text-center border">
                    <p className="text-muted m-0">
                        Hiện tại chưa có bài viết xu hướng nào trong hệ thống.
                    </p>
                </div>
            ) : (
                <>
                    <div className="row">
                        <div className="row justify-content-center">
                            {currentPosts.map((item) => (
                                <PostCard
                                    key={item.id}
                                    post={item}
                                />
                            ))}
                        </div>
                    </div>

                    {totalPages > 1 && (
                        <div className="d-flex justify-content-center mt-5">
                            <nav>
                                <ul className="pagination">

                                    {/* Previous */}
                                    <li
                                        className={`page-item ${currentPage === 1
                                                ? "disabled"
                                                : ""
                                            }`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() =>
                                                setCurrentPage(
                                                    currentPage - 1
                                                )
                                            }
                                        >
                                            &laquo;
                                        </button>
                                    </li>

                                    {/* Số trang */}
                                    {Array.from(
                                        { length: totalPages },
                                        (_, index) => (
                                            <li
                                                key={index + 1}
                                                className={`page-item ${currentPage ===
                                                        index + 1
                                                        ? "active"
                                                        : ""
                                                    }`}
                                            >
                                                <button
                                                    className="page-link"
                                                    onClick={() =>
                                                        setCurrentPage(
                                                            index + 1
                                                        )
                                                    }
                                                >
                                                    {index + 1}
                                                </button>
                                            </li>
                                        )
                                    )}

                                    {/* Next */}
                                    <li
                                        className={`page-item ${currentPage === totalPages
                                                ? "disabled"
                                                : ""
                                            }`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() =>
                                                setCurrentPage(
                                                    currentPage + 1
                                                )
                                            }
                                        >
                                            &raquo;
                                        </button>
                                    </li>

                                </ul>
                            </nav>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default PostList;