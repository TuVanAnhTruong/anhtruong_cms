import React from 'react';
import { useNavigate } from 'react-router-dom';
import './postcard.css';
const API_URL = "https://localhost:7284";

function PostCard({ post }) {
    const navigate = useNavigate();

    if (!post) return null;

    return (
        <div className="col-md-6 col-lg-4 mb-5">
            <article
                className="group cursor-pointer"
                onClick={() => navigate(`/post/${post.id}`)}
            >
                {/* Ảnh */}
                <div
                    className="overflow-hidden mb-4"
                    style={{
                        aspectRatio: '4/5',
                        backgroundColor: '#f8f8f8'
                    }}
                >
                    <img
                        src={`${API_URL}${post.imageUrl}`}
                        alt={post.title}
                        className="w-100 h-100"
                        style={{
                            objectFit: 'cover',
                            transition: 'transform 0.7s ease'
                        }}
                    />
                </div>

                {/* Nội dung */}
                <div>
                    {/* Meta */}
                    <div
                        className="d-flex align-items-center gap-2 text-uppercase mb-3"
                        style={{
                            fontSize: '12px',
                            letterSpacing: '1px',
                            color: '#777'
                        }}
                    >
                        <span
                            style={{
                                color: '#c89b5f',
                                fontWeight: '600'
                            }}
                        >
                            Xu hướng
                        </span>

                        <span
                            style={{
                                width: '4px',
                                height: '4px',
                                borderRadius: '50%',
                                background: '#bbb',
                                display: 'inline-block'
                            }}
                        ></span>

                        <span>
                            {new Date(post.createdDate).toLocaleDateString(
                                'vi-VN'
                            )}
                        </span>
                    </div>

                    {/* Tiêu đề */}
                    <h3
                        style={{
                            fontSize: '22px',
                            fontWeight: '500',
                            lineHeight: '1.5',
                            marginBottom: '12px',
                            transition: 'all .3s'
                        }}
                    >
                        {post.title}
                    </h3>

                    {/* Mô tả */}
                    <p
                        style={{
                            color: '#666',
                            lineHeight: '1.8',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                        }}
                    >
                        {post.shortDescription ||
                            'Nhấn để xem chi tiết bài viết...'}
                    </p>
                </div>
            </article>
        </div>
    );
}

export default PostCard;