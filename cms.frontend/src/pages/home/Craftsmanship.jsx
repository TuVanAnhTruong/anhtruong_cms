import React from 'react';

function Craftsmanship() {
    return (
        <section
            style={{
                background: '#f8f8f8'
            }}
            className="py-5"
        >
            <div className="container">
                <div className="row align-items-center">

                    <div className="col-lg-6">
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCftlcWFdH5Rc2MJQZxFs7jNiK12Y2Jca8_Th3E77li3Vd0d7AUBZ3UOMshfhseJQRsohUr7dlb-pZekIluRv_MESHXIPOY6suyBNnnL58HzbaTcAOyamqC42VSJsZHrgeTU8nJQ2LkFJAA5aLPi7ZzQ-NghhjfQkHEbWlu5ry294dvbifNV4X0u0HLoYAfpmFwIaVdijwEsgyWzdbJhKdtHYaD2TDN13d7lLhT4LgiNaSrOnzjTnYUyN2ap8PIOKjjohKCCrHfp_lU"
                            alt=""
                            className="img-fluid rounded shadow"
                        />
                    </div>

                    <div className="col-lg-6">
                        <span
                            className="text-uppercase"
                            style={{
                                color: '#c8a96a',
                                letterSpacing: '3px'
                            }}
                        >
                            Nghệ Thuật Thủ Công
                        </span>

                        <h2 className="display-5 fw-bold my-4">
                            Tinh Hoa Trong Từng
                            Chi Tiết Nhỏ Nhất
                        </h2>

                        <p className="text-muted">
                            Tại Aura, chúng tôi không chỉ tạo ra kính mắt,
                            mà còn kiến tạo trải nghiệm thị giác đẳng cấp.
                            Mỗi sản phẩm được hoàn thiện bởi những nghệ nhân
                            giàu kinh nghiệm với tiêu chuẩn chất lượng cao nhất.
                        </p>

                        <div className="mt-4">
                            <h5>✓ Vật liệu Titanium cao cấp</h5>
                            <h5>✓ Thấu kính chống UV 100%</h5>
                            <h5>✓ Thiết kế thủ công tinh xảo</h5>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Craftsmanship;