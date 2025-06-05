import { BASE_URL } from "../../../api/apiConfig";
import { Link } from "react-router-dom";
import { useState } from "react";

const CardWithVariants = ({ product }) => {
    const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

    const handleVariantChange = (e) => {
        const selectedId = parseInt(e.target.value);
        const variant = product.variants.find(v => v.id === selectedId);
        setSelectedVariant(variant);
    };

    return (
        <div className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-0">
                <img
                    src={`${BASE_URL}/images/400_${
                        selectedVariant.productImages[0]?.name
                    }`}
                    className="card-img-top rounded-top"
                    alt={product.name}
                    style={{ height: "300px", objectFit: "cover" }}
                />

                <div className="card-body d-flex flex-column">
                    <div className="text-center mb-2">
                        <h5 className="card-title mb-1">{product.name}</h5>

                        <select
                            className="form-select form-select-sm mb-2"
                            value={selectedVariant.id}
                            onChange={handleVariantChange}
                        >
                            {product.variants.map((variant) => (
                                <option key={variant.id} value={variant.id}>
                                    {variant.productSize?.name} • {variant.weight} г — {variant.price} ₴
                                </option>
                            ))}
                        </select>
                    </div>

                    <p className="text-muted small text-center mb-3">
                        {product.productIngredients.slice(0, 5).map((ing, index, arr) => (
                            <span key={ing.id}>
                                {ing.name}
                                {index < arr.length - 1 ? ", " : ""}
                            </span>
                        ))}
                        {product.productIngredients.length > 5 && " та інші..."}
                    </p>

                    <div className="mt-auto d-flex justify-content-between align-items-center">
                        <span className="h5 mb-0">{selectedVariant.price} ₴</span>
                        <Link
                            to={`/products/list/${product.slug}?variant=${selectedVariant.id}`}
                            className="btn btn-success btn-lg"
                        >
                            Хочу
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardWithVariants;
