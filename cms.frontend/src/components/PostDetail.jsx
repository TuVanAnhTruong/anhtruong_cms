import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import blogService from '../services/blogService';

const API_URL = "https://localhost:7284";

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await blogService.getPostById(id);
                setPost(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPost();
    }, [id]);

    if (!post) {
        return <h3>Đang tải bài viết...</h3>;
    }

    return (
        <div className="container mt-4">
            <h2>{post.title}</h2>

            <p className="text-muted">
                {new Date(post.createdDate).toLocaleDateString('vi-VN')}
            </p>

            <img
                src={`${API_URL}${post.imageUrl}`}
                alt={post.title}
                style={{ width: '500px', maxWidth: '100%' }}
            />

            <div className="mt-4">
                {post.content}
            </div>
        </div>
    );
};

export default PostDetail;