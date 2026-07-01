import React from "react";

function CollectionCTA() {
    return (
        <section className="py-5 text-center bg-light">
            <div
                className="container"
                style={{ maxWidth: "800px" }}
            >
                <h2
                    className="display-4 mb-4"
                    style={{
                        fontFamily:
                            "Cormorant Garamond, serif"
                    }}
                >
                    The Bespoke Experience
                </h2>

                <p className="text-muted">
                    Dịch vụ Bespoke của Aura cho phép bạn kiến tạo
                    nên tuyệt tác riêng của mình.
                </p>

                <div className="mt-4">
                    <button className="btn btn-dark me-3 px-5 py-3">
                        HẸN LỊCH TƯ VẤN
                    </button>

                    <button className="btn btn-outline-dark px-5 py-3">
                        XEM CATALOGUE
                    </button>
                </div>
            </div>
        </section>
    );
}

export default CollectionCTA;