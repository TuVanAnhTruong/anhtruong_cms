import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productService from '../services/productService';
import CartManager from '../utils/CartManager';
const API_URL = "https://localhost:7284";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const data = await productService.getProductById(id);
                setProduct(data);
            } catch (error) {
                console.error(error);
            }
        };
        loadProduct();
    }, [id]);

    if (!product) {
        return (
            <div style={styles.loadingWrapper}>
                <div style={styles.spinner} />
                <p style={styles.loadingText}>Đang tải sản phẩm...</p>
            </div>
        );
    }
    const handleAddToCart = () => {
        if (quantity > product.stockQuantity) {
            alert(
                `Số lượng mua (${quantity}) vượt quá tồn kho (${product.stockQuantity})`
            );
            return;
        }

        CartManager.addToCart(
            product,
            quantity
        );

        alert("Đã thêm vào giỏ hàng");
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                {/* Image Section */}
                <div style={styles.imageWrapper}>
                    <img
                        src={`${API_URL}${product.imageUrl}`}
                        alt={product.name}
                        style={styles.image}
                    />
                </div>

                {/* Info Section */}
                <div style={styles.info}>
                    <p style={styles.badge}>Sản phẩm</p>
                    <h1 style={styles.title}>{product.name}</h1>

                    <div style={styles.divider} />

                    <p style={styles.price}>
                        {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND"
                        }).format(product.price)}
                    </p>

                    <div style={styles.stockRow}>
                        <span style={{
                            ...styles.stockBadge,
                            background: product.stockQuantity > 0 ? '#dcfce7' : '#fee2e2',
                            color: product.stockQuantity > 0 ? '#15803d' : '#b91c1c',
                        }}>
                            {product.stockQuantity > 0
                                ? `● Còn hàng (${product.stockQuantity})`
                                : '● Hết hàng'}
                        </span>
                    </div>

                    <div style={{ marginTop: '10px' }}>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: '6px',
                                fontWeight: '600'
                            }}
                        >
                            Số lượng:
                        </label>

                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                            }
                            style={{
                                width: '100px',
                                padding: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '6px'
                            }}
                        />
                    </div>

                    <div style={styles.divider} />

                    <div style={styles.descSection}>
                        <p style={styles.descLabel}>Mô tả sản phẩm</p>
                        <p style={styles.descText}>{product.description}</p>
                    </div>

                    <button style={styles.button} onClick={handleAddToCart}
                        onMouseEnter={e => e.currentTarget.style.background = '#1d4ed8'}
                        onMouseLeave={e => e.currentTarget.style.background = '#2563eb'}
                    >
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    page: {
        minHeight: '100vh',
        background: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 16px',
        fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
    },
    card: {
        display: 'flex',
        flexDirection: 'row',
        background: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        maxWidth: '900px',
        width: '100%',
        flexWrap: 'wrap',
    },
    imageWrapper: {
        flex: '1 1 340px',
        background: '#f1f5f9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        minHeight: '360px',
    },
    image: {
        width: '100%',
        maxWidth: '320px',
        height: 'auto',
        objectFit: 'contain',
        borderRadius: '10px',
    },
    info: {
        flex: '1 1 320px',
        padding: '40px 36px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    badge: {
        display: 'inline-block',
        fontSize: '11px',
        fontWeight: '600',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: '#2563eb',
        background: '#eff6ff',
        borderRadius: '999px',
        padding: '4px 12px',
        width: 'fit-content',
        margin: '0',
    },
    title: {
        fontSize: '26px',
        fontWeight: '700',
        color: '#0f172a',
        margin: '0',
        lineHeight: '1.3',
    },
    divider: {
        height: '1px',
        background: '#e2e8f0',
        margin: '4px 0',
    },
    price: {
        fontSize: '28px',
        fontWeight: '700',
        color: '#2563eb',
        margin: '0',
    },
    stockRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    stockBadge: {
        fontSize: '13px',
        fontWeight: '500',
        borderRadius: '999px',
        padding: '4px 12px',
    },
    descSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        flex: 1,
    },
    descLabel: {
        fontSize: '13px',
        fontWeight: '600',
        color: '#64748b',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        margin: '0',
    },
    descText: {
        fontSize: '15px',
        color: '#334155',
        lineHeight: '1.7',
        margin: '0',
    },
    button: {
        marginTop: '8px',
        padding: '14px 24px',
        background: '#2563eb',
        color: '#ffffff',
        border: 'none',
        borderRadius: '10px',
        fontSize: '15px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background 0.2s ease',
        width: '100%',
    },
    loadingWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: '16px',
    },
    spinner: {
        width: '40px',
        height: '40px',
        border: '4px solid #e2e8f0',
        borderTop: '4px solid #2563eb',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
    },
    loadingText: {
        color: '#64748b',
        fontSize: '15px',
        fontFamily: "'Segoe UI', system-ui, sans-serif",
    },
};

// Inject keyframe for spinner
const styleTag = document.createElement('style');
styleTag.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
document.head.appendChild(styleTag);

export default ProductDetail;