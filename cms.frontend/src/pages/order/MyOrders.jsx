import React, { useEffect, useState } from "react";
import productService from "../../services/productService";

function MyOrders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const customerString = localStorage.getItem("customer");

        if (!customerString) {
            setLoading(false);
            return;
        }

        const customer = JSON.parse(customerString);

        console.log("Customer:", customer);

        if (customer && customer.id) {
            loadOrders(customer.id);
        } else {
            setLoading(false);
        }

    }, []);

    const loadOrders = async (customerId) => {

        try {

            const data = await productService.getOrdersByCustomer(customerId);

            console.log("Orders:", data);

            // data chính là mảng vì axiosClient đã return response.data
            setOrders(Array.isArray(data) ? data : []);

        } catch (err) {

            console.error(err);
            setOrders([]);

        } finally {

            setLoading(false);

        }

    };

    const getStatus = (status) => {

        switch (status) {

            case 0:
                return "Chờ xác nhận";

            case 1:
                return "Đang xử lý";

            case 2:
                return "Đang giao";

            case 3:
                return "Đã giao";

            default:
                return "Không xác định";
        }

    };

    const getBadge = (status) => {

        switch (status) {

            case 0:
                return "badge bg-warning text-dark";

            case 1:
                return "badge bg-info";

            case 2:
                return "badge bg-primary";

            case 3:
                return "badge bg-success";

            default:
                return "badge bg-secondary";
        }

    };

    if (loading) {
        return (
            <div className="container py-5">
                <h3>Đang tải đơn hàng...</h3>
            </div>
        );
    }

    return (

        <div className="container py-5">

            <h2 className="mb-4">
                Đơn hàng của tôi
            </h2>

            {orders.length === 0 ? (

                <div className="alert alert-warning">
                    Bạn chưa có đơn hàng nào.
                </div>

            ) : (

                <table className="table table-bordered table-hover">

                    <thead className="table-dark">

                        <tr>
                            <th>Mã đơn</th>
                            <th>Ngày đặt</th>
                            <th>Ghi chú</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                        </tr>

                    </thead>

                    <tbody>

                        {orders.map(order => (

                            <tr key={order.id}>

                                <td>
                                    #{order.id}
                                </td>

                                <td>
                                    {new Date(order.orderDate).toLocaleString("vi-VN")}
                                </td>

                                <td>
                                    {order.notes || "-"}
                                </td>

                                <td className="text-danger fw-bold">
                                    {Number(order.totalAmount).toLocaleString("vi-VN")} ₫
                                </td>

                                <td>

                                    <span className={getBadge(order.status)}>
                                        {getStatus(order.status)}
                                    </span>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            )}

        </div>

    );

}

export default MyOrders;