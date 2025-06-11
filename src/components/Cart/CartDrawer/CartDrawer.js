import { Badge, Drawer, Button, List, Typography, Image, Space, Divider } from "antd";
import { ShoppingCartOutlined, DeleteOutlined,  MinusOutlined, PlusOutlined } from "@ant-design/icons";
import {useState, useMemo, useEffect} from "react";
import { useCartStore } from "../../../store/cartStore";

const { Text, Title } = Typography;

const CartDrawer = () => {
    const cartList = useCartStore((state) => state.cartList);
    const {removeItem, updateQuantity} = useCartStore((state) => state); // Додай цю функцію в store
    const [open, setOpen] = useState(false);

    const totalPrice = useMemo(() =>
        cartList.reduce((sum, item) => sum + item.price * item.quantity, 0), [cartList]
    );

    useEffect(() => {
        console.log({cartList});
    }, []);

    return (
        <>
            <Badge count={cartList.length} showZero>
                <Button
                    icon={<ShoppingCartOutlined/>}
                    onClick={() => setOpen(true)}
                />
            </Badge>

            <Drawer title="Ваш кошик" onClose={() => setOpen(false)} open={open} width={400}>
                <List
                    dataSource={cartList}
                    locale={{ emptyText: 'Кошик порожній' }}
                    renderItem={(item) => (
                        <List.Item
                            actions={[
                                <Button
                                    danger
                                    icon={<DeleteOutlined />}
                                    onClick={() => removeItem(item.id)}
                                />
                            ]}
                        >
                            <Space align="start">
                                <Image src={item.image} width={64} height={64} preview={false} />
                                <div>
                                    <Text strong>{item.name}</Text><br />
                                    <Text type="secondary">{item.category}</Text><br />

                                    <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "8px 0" }}>
                                        <Button
                                            size="small"
                                            icon={<MinusOutlined />}
                                            onClick={() =>
                                                item.quantity > 1 &&
                                                updateQuantity(item.id, item.quantity - 1)
                                            }
                                        />
                                        <Text>{item.quantity}</Text>
                                        <Button
                                            size="small"
                                            icon={<PlusOutlined />}
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        />
                                    </div>s

                                    <Text>Ціна: {item.price} ₴</Text>
                                </div>
                            </Space>
                        </List.Item>
                    )}
                />

                <Divider />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Title level={5}>Сума: {totalPrice} грн</Title>
                    <Button type="primary" disabled={cartList.length === 0}>
                        Оформити замовлення
                    </Button>
                </div>
            </Drawer>
        </>
    );
};

export default CartDrawer;
