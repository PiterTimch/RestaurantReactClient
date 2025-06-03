import './index.css';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosInstance from "../../../api/axiosInstance";
import {BASE_URL} from "../../../api/apiConfig";
import LoadingOverlay from "../../../components/common/LoadingOverlay";

const ProductItemPage = () => {
    const [product, setProduct] = useState({});
    const [mainImage, setMainImage] = useState(null);
    const { slug } = useParams();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axiosInstance.get(`/api/Products/${slug}`);
                console.log(res.data);

                setProduct(res.data);
                if (res.data.productImages?.length > 0) {
                    setMainImage(`${BASE_URL}/images/800_${res.data.productImages[0].name}`);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProduct();
    }, [slug]);

    return(
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <img
                            src={
                                mainImage || "https://via.placeholder.com/400x300?text=No+Image"
                            }
                            alt={product.name}
                            className="img-fluid rounded mb-3 product-image"
                            id="mainImage"
                        />
                        <div className="d-flex gap-5 flex-wrap">
                            {product.productImages?.map((img, index) => (
                                <img
                                    key={img.id}
                                    src={`${BASE_URL}/images/200_${img.name}`}
                                    alt={`Product thumbnail ${index + 1}`}
                                    className="thumbnail rounded border"
                                    style={{ width: '70px', height: '70px', objectFit: 'cover', cursor: 'pointer' }}
                                    onClick={() => setMainImage(`${BASE_URL}/images/800_${img.name}`)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <h2 className="mb-3">{product.name}</h2>
                        <p className="text-muted mb-2">Категорія: {product.category?.name}</p>
                        <p className="text-muted mb-2">Вага: {product.weight} г</p>

                        <div className="mb-3">
                            <span className="h4 me-2">{product.price} грн</span>
                        </div>

                        <div className="mb-4">
                            <h5>Розмір:</h5>
                            <div className="btn-group" role="group" aria-label="Size selection">
                                <input type="radio" className="btn-check" name="size" id={product.productSize?.name} autoComplete="off" defaultChecked />
                                <label className="btn btn-outline-primary" htmlFor={product.productSize?.name}>{product.productSize?.name}</label>

                                <input type="radio" id="other-size" className="btn-check" name="size" autoComplete="off" />
                                <label htmlFor="other-size" className="btn btn-outline-primary">Колись тут будуть інші розміра :)</label>
                            </div>
                        </div>

                        <button className="btn btn-primary btn-lg mb-3 me-2">
                            <i className="bi bi-cart-plus"></i> Додати в кошик
                        </button>

                        <button className="btn btn-outline-secondary btn-lg mb-3">
                            <i className="bi bi-heart"></i> У бажане
                        </button>

                        <div className="mt-4">
                            <h5>Інгредієнти:</h5>
                            <div className="d-flex flex-wrap gap-3">
                                {product.productIngredients?.map((ingredient) => (
                                    <div
                                        key={ingredient.id}
                                        className="text-center"
                                        style={{ width: '80px' }}
                                    >
                                        <img
                                            src={`${BASE_URL}/images/200_${ingredient.image}`}
                                            alt={ingredient.name}
                                            className="img-fluid rounded shadow-sm"
                                            style={{ width: '100%', height: '70px', objectFit: 'cover' }}
                                        />
                                        <small className="d-block mt-1">{ingredient.name}</small>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isLoading && <LoadingOverlay />}
        </>
    );
}

export default ProductItemPage;