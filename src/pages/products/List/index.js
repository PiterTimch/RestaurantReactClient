import {useEffect, useState} from "react";
import axiosInstance from "../../../api/axiosInstance";
import {BASE_URL} from "../../../api/apiConfig";
import {Link} from "react-router-dom";
import LoadingOverlay from "../../../components/common/LoadingOverlay";

const ProductsListPage = () => {
    const [productsList, setProductList] =  useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axiosInstance.get(`/api/Products/list`);
                console.log(res.data);

                setProductList(res.data);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProduct();
    }, []);

    return (
        <div className="container py-5">
            <div className="row g-4">
                {productsList?.map((product) => (
                    <div key={product.id} className="col-md-6 col-lg-4">
                        <div className="card h-100 shadow-sm border-0">
                            <img
                                src={`${BASE_URL}/images/400_${product.productImages[0]?.name}`}
                                className="card-img-top rounded-top"
                                alt={product.name}
                                style={{ height: "300px", objectFit: "cover" }}
                            />
                            <div className="card-body d-flex flex-column">
                                <div className="text-center mb-2">
                                    <h5 className="card-title mb-1">{product.name}</h5>
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
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {isLoading && <LoadingOverlay />}
        </div>
    );
}

export default ProductsListPage;