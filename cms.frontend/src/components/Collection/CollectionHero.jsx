import React from "react";

function CollectionHero() {
    return (
        <section className="py-5 border-bottom text-center">
            <div className="container">
                <div className="mx-auto" style={{ maxWidth: "800px" }}>
                    <span
                        className="text-uppercase"
                        style={{
                            letterSpacing: "6px",
                            color: "#c8a46b"
                        }}
                    >
                        The Anthology of Vision
                    </span>

                    <h1
                        className="display-2 fw-light my-4"
                        style={{
                            fontFamily: "Cormorant Garamond, serif"
                        }}
                    >
                        Curated Collections
                    </h1>

                    <p className="lead text-muted">
                        Khám phá hành trình nghệ thuật qua các thời kỳ thiết kế
                        của Aura.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default CollectionHero;