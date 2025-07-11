import {BASE_URL} from "../../../api/apiConfig";
import {Link} from "react-router-dom";
import {ShoppingCartOutlined} from "@ant-design/icons";
import {useCartLogic} from "../../../hooks/useCartLogic";
import {Button} from "antd";
const SimpleCard = ({product}) => {

    const { cartItem, isInCart, addToCart } = useCartLogic(product, `${product.productImages[0].name}`);

    return (
        <>
            <div key={product.id} className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm border-0">
                    <img
                        src={
                            product.productImages?.length > 0
                                ? `${BASE_URL}/images/400_${product.productImages[0].name}`
                                : '/defaultImages/no-product-image.jpg'
                        }

                        className="card-img-top rounded-top"
                        alt={product.name}
                        style={{ height: "300px", objectFit: "cover" }}
                    />
                    <div className="card-body d-flex flex-column">
                        <div className="text-center mb-2">

                            <div className="mt-auto d-flex justify-content-between align-items-center">
                                <h5 className="card-title mb-1">{product.name}</h5>
                                {isInCart ?
                                    (
                                        <Button
                                            icon={<ShoppingCartOutlined />}
                                            disabled={true}
                                        />
                                    ) :(
                                        <Button
                                            icon={<ShoppingCartOutlined />}
                                            className="btn btn-success"
                                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                            onClick={() => addToCart(cartItem)}
                                        />
                                    )}
                            </div>

                            <small className="text-muted">
                                {product.productSize?.name} • {product.weight} г
                            </small>
                        </div>

                        <p className="text-muted small text-center mb-3">
                            {product.productIngredients.slice(0, 5).map((ing, index, arr) => (
                                <span key={ing.id}>
                                            {ing.name}{index < arr.length - 1 ? ', ' : ''}
                                        </span>
                            ))}
                            {product.productIngredients.length > 5 && ' та інші...'}
                        </p>


                        <div className="mt-auto d-flex justify-content-between align-items-center">
                            <span className="h5 mb-0">{product.price} ₴</span>
                            <Link
                                to={`/products/list/${product.slug}`}
                                className="btn btn-success btn-lg"
                            >
                                Хочу
                            </Link>

                            <Link to={`/products/edit/${product.id}`} className={"btn btn-success"}>Edit</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SimpleCard;