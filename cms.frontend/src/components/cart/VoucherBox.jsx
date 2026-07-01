const VoucherBox = () => {
    return (
        <div className="voucher-box">
            <h4>Mã giảm giá</h4>

            <div className="voucher-input">
                <input
                    type="text"
                    placeholder="Nhập mã ưu đãi"
                />

                <button>Áp dụng</button>
            </div>
        </div>
    );
};

export default VoucherBox;