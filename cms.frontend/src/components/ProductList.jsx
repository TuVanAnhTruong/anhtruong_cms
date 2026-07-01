import React, { useState } from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products = [] }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const productsPerPage = 6;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    const currentProducts = products.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    const totalPages = Math.ceil(products.length / productsPerPage);

    return (
        <>
            <div className="row g-4">
                {products.length === 0 ? (
                    <div className="col-12">
                        <p className="text-muted">
                            Chưa có sản phẩm nào trong hệ thống.
                        </p>
                    </div>
                ) : (
                    currentProducts.map((item) => (
                        <div
                            className="col-lg-4 col-md-6 col-sm-6"
                            key={item.id}
                        >
                            <ProductCard product={item} />
                        </div>
                    ))
                )}
            </div>

            {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-5">
                    <nav>
                        <ul className="pagination">

                            {/* Prev */}
                            <li
                                className={`page-item ${currentPage === 1 ? "disabled" : ""
                                    }`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() =>
                                        setCurrentPage(currentPage - 1)
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
                                        className={`page-item ${currentPage === index + 1
                                                ? "active"
                                                : ""
                                            }`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() =>
                                                setCurrentPage(index + 1)
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
                                        setCurrentPage(currentPage + 1)
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
    );
};

export default ProductList;