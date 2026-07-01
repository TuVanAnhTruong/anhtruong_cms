import React from "react";

function CollectionStory({ item }) {
    return (
        <section className="py-5">
            <div className="container">
                <div
                    className={`row align-items-center ${item.reverse ? "flex-row-reverse" : ""
                        }`}
                >
                    <div className="col-lg-7">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="img-fluid shadow"
                            style={{
                                height: "80vh",
                                width: "100%",
                                objectFit: "cover"
                            }}
                        />
                    </div>

                    <div className="col-lg-5">
                        <span
                            style={{
                                letterSpacing: "4px",
                                color: "#c8a46b"
                            }}
                        >
                            {item.chapter}
                        </span>

                        <h2
                            className="display-5 my-4"
                            style={{
                                fontFamily:
                                    "Cormorant Garamond, serif"
                            }}
                        >
                            {item.title}
                        </h2>

                        <div
                            style={{
                                width: "60px",
                                height: "2px",
                                background: "#c8a46b",
                                marginBottom: "20px"
                            }}
                        />

                        <p className="text-muted">
                            {item.description}
                        </p>

                        {/*<button className="btn btn-outline-dark mt-3 px-4 py-3">*/}
                        {/*    XEM CHI TIẾT*/}
                        {/*</button>*/}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CollectionStory;