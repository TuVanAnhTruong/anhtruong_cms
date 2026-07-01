import React from 'react';

function HeroBanner() {
    return (
        <section
            className="position-relative d-flex align-items-center text-center text-white"
            style={{
                minHeight: '100vh',
                backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDDPSqD8Y9G6Dk_MmbdXO8V4qYvc_v_mTWAHCkOmEDXQUdrc9avs-MrG6rUByKQiUArFuXqcmgxPwKJzidcBSlrpr3nEls_yvcIM8xfjqAUhXxmQKvuvj2nPdIa06sCSsboJtN7aapVJRH-hJeaKEFcJXIhOoPjud-f9kN4s7i1BYrn4IwzEsL9itqIDF8FboqwybNMeiS6mNqqtL88-sociytSMe6uZ6--0eqPyupZGgpRejJWFsWRPjIND5qNU8PSwkCbbQQg0kIf')",
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                    background: 'rgba(0,0,0,0.35)'
                }}
            ></div>

            <div className="container position-relative">
                <span
                    className="px-4 py-2 border"
                    style={{
                        letterSpacing: '3px',
                        fontSize: '12px'
                    }}
                >
                    NEW COLLECTION 2026
                </span>

                <h1
                    className="fw-bold mt-4"
                    style={{
                        fontSize: 'clamp(3rem,7vw,6rem)'
                    }}
                >
                    Tầm Nhìn Sang Trọng
                    <br />
                    Phong Cách Đẳng Cấp
                </h1>

                <p
                    className="mx-auto mt-4"
                    style={{
                        maxWidth: '700px',
                        fontSize: '18px'
                    }}
                >
                    Khám phá bộ sưu tập kính mắt thủ công tinh xảo,
                    nơi nghệ thuật gặp gỡ công nghệ để tôn vinh
                    vẻ đẹp cá nhân của bạn.
                </p>

                <div className="mt-5 d-flex justify-content-center gap-3 flex-wrap">
                    <a
                        href="/shop"
                        className="btn btn-light px-5 py-3 fw-bold"
                    >
                        MUA NGAY
                    </a>

                    {/*<button*/}
                    {/*    className="btn btn-outline-light px-5 py-3 fw-bold"*/}
                    {/*>*/}
                    {/*    XEM LOOKBOOK*/}
                    {/*</button>*/}
                </div>
            </div>
        </section>
    );
}

export default HeroBanner;