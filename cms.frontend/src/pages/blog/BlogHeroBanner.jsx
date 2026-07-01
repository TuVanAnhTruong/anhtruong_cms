import React from "react";

function BlogHeroBanner() {
    return (
        <section
            style={{
                position: "relative",
                height: "820px",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                backgroundColor: "#f8f8f8",
            }}
        >
            {/* Background */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 0,
                }}
            >
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundImage:
                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAAWHSxfpSGS0cTLeEdZMGU_lnYsdcf0KC_BS2ocE_S6Cx7Q22peOzgoxgA-x52yhQYiFIbLVdO6veaV7EZJWdtZL_Ik0-dB6b1Ea9okN69XycYVyh8BN0mmfllnMHN-qDR6PvB3kwFKsgEyFgCK44DTIruFU9wF6Ijf8NdWwi8DlRRIoKSRest3tmrFgH0Bu8WCfT9L5PDZ1Ry5_CrwHxwZSrVD1NTRnZiYQXla3HwjBK6CHaJSjDKQp1GhQlG8RfHzOZpA50DXwtp')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />

                {/* Overlay */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(to right, rgba(255,255,255,0.95), rgba(255,255,255,0.45), transparent)",
                    }}
                />
            </div>

            {/* Content */}
            <div
                className="container position-relative"
                style={{ zIndex: 2 }}
            >
                <div style={{ maxWidth: "700px" }}>
                    <span
                        style={{
                            display: "inline-block",
                            padding: "8px 16px",
                            background: "#d4af37",
                            color: "#fff",
                            fontSize: "12px",
                            fontWeight: 600,
                            letterSpacing: "2px",
                            marginBottom: "24px",
                        }}
                    >
                        XU HƯỚNG MỚI
                    </span>

                    <h1
                        style={{
                            fontSize: "clamp(40px,6vw,72px)",
                            fontWeight: 700,
                            lineHeight: 1.15,
                            marginBottom: "24px",
                            color: "#111",
                        }}
                    >
                        Nghệ thuật Thủ công
                        <br />
                        &amp; Tầm nhìn Đương đại 2024
                    </h1>

                    <p
                        style={{
                            fontSize: "20px",
                            lineHeight: 1.8,
                            color: "#666",
                            marginBottom: "40px",
                            maxWidth: "600px",
                        }}
                    >
                        Khám phá hành trình tạo nên những chiếc kính không chỉ
                        là phụ kiện, mà là một tuyệt tác nghệ thuật định hình
                        phong cách cá nhân và đẳng cấp thượng lưu.
                    </p>

                </div>
            </div>
        </section>
    );
}

export default BlogHeroBanner;