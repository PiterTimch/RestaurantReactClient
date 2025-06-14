import './index.css';
import {useParams} from "react-router-dom";
import {Fragment, useEffect, useMemo, useState} from "react";
import axiosInstance from "../../../api/axiosInstance";
import {BASE_URL} from "../../../api/apiConfig";
import LoadingOverlay from "../../../components/common/LoadingOverlay";
import {useCartLogic} from "../../../hooks/useCartLogic";

const ProductItemPage = () => {
    const [product, setProduct] = useState({});
    const [mainImage, setMainImage] = useState(null);
    const { slug } = useParams();
    const [selectedVariant, setSelectedVariant] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    const selectedProduct = useMemo(() => {
        if (!selectedVariant) return product;

        return {
            ...product,
            id: selectedVariant.id,
            price: selectedVariant.price,
            sizeName: selectedVariant.productSize?.name,
        };
    }, [product, selectedVariant]);


    const image = useMemo(() => {
        if (!selectedVariant) return product;

        return `${selectedVariant.productImages[0]?.name}`;
    }, [selectedVariant]);

    const { cartItem, isInCart, addToCart } = useCartLogic(selectedProduct, image);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axiosInstance.get(`/api/Products/${slug}`);
                const {data} = await res;
                console.log(data);
                setProduct(res.data);

                if (data.variants && data.variants.length > 0) {
                    setSelectedVariant(data.variants[0]);
                    if (data.variants[0].productImages.length > 0) {
                        setMainImage(`${BASE_URL}/images/800_${data.variants[0].productImages[0].name}`);
                    }
                    else {
                        setMainImage(null);
                    }
                }

                else {
                    setSelectedVariant(null);
                    if (data.productImages && data.productImages.length > 0) {
                        setMainImage(`${BASE_URL}/images/800_${data.productImages[0].name}`);
                    }
                    else {
                        setMainImage(null);
                    }
                }

            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProduct();
    }, [slug]);

    const handleThumbnailClick = (imgName) => {
        setMainImage(`${BASE_URL}/images/800_${imgName}`);
    };

    return(
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <img
                            src={
                                mainImage
                            }
                            alt={product.name}
                            className="img-fluid rounded mb-3 product-image"
                            id="mainImage"
                        />
                        <div className="d-flex gap-3 flex-wrap">
                            {(selectedVariant ? selectedVariant.productImages : product.productImages)?.map((img) => (
                                <img
                                    key={img.id}
                                    src={`${BASE_URL}/images/200_${img.name}`}
                                    alt={`Thumbnail ${img.id}`}
                                    className="thumbnail rounded border"
                                    style={{ width: '70px', height: '70px', objectFit: 'cover', cursor: 'pointer' }}
                                    onClick={() => handleThumbnailClick(img.name)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <h2 className="mb-3">{product.name}</h2>
                        <p className="text-muted mb-2">Категорія: {product.category?.name}</p>

                        <p className="text-muted mb-2">Вага: {selectedVariant ? selectedVariant.weight : product.weight} г</p>

                        <div className="mb-3">
                            <span className="h4 me-2">{selectedVariant ? selectedVariant.price : product.price} грн</span>
                        </div>

                        {product.variants && product.variants.length > 0 ? (
                            <div className="mb-4">
                                <h5>Розмір:</h5>
                                <div className="btn-group" role="group" aria-label="Size selection">
                                    {product.variants.map((variant) => (
                                        <Fragment key={variant.id}>
                                            <input
                                                type="radio"
                                                className="btn-check"
                                                name="size"
                                                id={`size-${variant.id}`}
                                                autoComplete="off"
                                                checked={selectedVariant?.id === variant.id}
                                                onChange={() => {
                                                    setSelectedVariant(variant);
                                                    if (variant.productImages.length > 0) {
                                                        setMainImage(`${BASE_URL}/images/800_${variant.productImages[0].name}`);
                                                    } else {
                                                        setMainImage(null);
                                                    }
                                                }}
                                            />
                                            <label className="btn btn-outline-primary" htmlFor={`size-${variant.id}`}>
                                                {variant.productSize?.name}
                                            </label>
                                        </Fragment>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="mb-4">
                                <h5>Розмір:</h5>
                                <div className="btn-group" role="group" aria-label="Size selection">
                                    <input
                                        type="radio"
                                        className="btn-check"
                                        name="size"
                                        id={product.productSize?.name}
                                        autoComplete="off"
                                        defaultChecked
                                    />
                                    <label className="btn btn-outline-primary" htmlFor={product.productSize?.name}>
                                        {product.productSize?.name}
                                    </label>
                                </div>
                            </div>
                        )}

                        {isInCart ?
                            (
                                <div className="btn btn-success btn-lg mb-3 me-2 disabled">
                                    <i className="bi bi-check-circle"></i> У кошику
                                </div>
                            )
                            :(
                                <button onClick={() => addToCart(cartItem)} className="btn btn-primary btn-lg mb-3 me-2">
                                    <i className="bi bi-cart-plus"></i> Додати в кошик
                                </button>
                            )}

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