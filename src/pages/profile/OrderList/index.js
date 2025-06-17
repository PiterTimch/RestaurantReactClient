import { useEffect, useState } from "react";
import {Button, Collapse} from "antd";
import axiosInstance from "../../../api/axiosInstance";
import { BASE_URL } from "../../../api/apiConfig";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Panel } = Collapse;

const OrderListPage = () => {
    const [orders, setOrders] = useState([]);
    const [activeKeys, setActiveKeys] = useState([]);

    useEffect(() => {
        axiosInstance.get(`${BASE_URL}/api/Order/list`)
            .then(res => setOrders(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="container py-5" style={{ fontSize: "18px", lineHeight: 1.6 }}>
            <h2 className="mb-4" style={{ fontSize: "28px" }}>Мої замовлення</h2>

            {orders.length === 0 ? (
                <p>У вас ще немає замовлень.</p>
            ) : (
                <Collapse
                    activeKey={activeKeys}
                    onChange={(keys) => setActiveKeys(Array.isArray(keys) ? keys : [keys])}
                    accordion={false}
                    expandIconPosition="right"
                    ghost
                >
                    {orders.map(order => (
                        <Panel
                            header={
                                <div className="d-flex justify-content-between align-items-center w-100" style={{ fontSize: "20px" }}>
                                    <div>
                                        <strong>Замовлення #{order.id}</strong>
                                        <div className="text-muted small" style={{ fontSize: "16px" }}>
                                            {new Date(order.dateCreated).toLocaleString()}
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center" style={{ fontSize: "18px" }}>
                                        <span className="badge bg-primary me-3">{order.status}</span>
                                    </div>
                                </div>
                            }
                            key={order.id.toString()}
                        >
                            <ul className="list-group list-group-flush" style={{ fontSize: "18px" }}>
                                {order.orderItems.map((item, idx) => (
                                    <li key={idx} className="list-group-item d-flex align-items-center" style={{ fontSize: "18px" }}>
                                        {item.productImage && (
                                            <img
                                                src={`${BASE_URL}/images/50_${item.productImage}`}
                                                alt={item.productName}
                                                className="rounded me-3"
                                                style={{ width: "60px", height: "60px", objectFit: "cover" }}
                                            />
                                        )}
                                        <div className="flex-grow-1">
                                            <div className={"d-flex justify-content-start"}>
                                                <strong>{item.productName}</strong>
                                                <Link to={`/products/list/${item.productSlug}`}>
                                                    <Button className="m-0 ms-3" icon={<EyeOutlined />} />
                                                </Link>
                                            </div>
                                            <div className="text-muted small" style={{ fontSize: "16px" }}>
                                                Кількість: {item.count} × {item.priceBuy} грн
                                            </div>
                                        </div>
                                        <div>
                                            <strong>{item.count * item.priceBuy} грн</strong>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div className="card-footer text-end" style={{ fontSize: "20px" }}>
                                <strong>Загальна сума: {order.totalPrice} грн</strong>
                            </div>
                        </Panel>
                    ))}
                </Collapse>
            )}
        </div>
    );
};

export default OrderListPage;
