import React from 'react';

function ShopHeader({ total, keyword, onSearchChange }) {
    return (
        <div className="card p-3 mb-4 shadow-sm border-0">
            <div className="row align-items-center">
                {/* Hiển thị số đếm kết quả động */}
                <div className="col-md-4">
                    <span className="font-weight-bold text-secondary">
                        Tim thay <span className="text-primary">{total}</span> san pham
                    </span>
                </div>
                {/* Ô ô nhập liệu tìm kiếm theo từ khóa */}
                <div className="col-md-8">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-white border-right-0 text-muted">
                                <i className="fas fa-search"></i>
                            </span>
                        </div>
                        <input
                            type="text"
                            className="form-control border-left-0"
                            placeholder="Gõ từ khóa tìm gọng kính, tròng kính, kính râm..."
                            value={keyword}
                            onChange={(e) => onSearchChange({ keyword: e.target.value })}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}


export default ShopHeader;
