import {useEffect, useState} from "react";
import axiosInstance from "../../../api/axiosInstance";
import {BASE_URL} from "../../../api/apiConfig";
import {Link} from "react-router-dom";
import LoadingOverlay from "../../../components/common/LoadingOverlay";
import SimpleCard from "../../../components/common/SimpleCard";
import CardWithVariants from "../../../components/common/CardWithVariants";

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
                    product.variants?.length > 0
                            ? <CardWithVariants product={product} />
                            : <SimpleCard product={product} />

                ))}
            </div>
            {isLoading && <LoadingOverlay />}
        </div>
    );
}

export default ProductsListPage;