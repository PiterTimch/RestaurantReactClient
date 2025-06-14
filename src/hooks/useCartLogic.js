import { useEffect, useState } from "react";
import {useCartStore} from "../store/cartStore";

export const useCartLogic = (product, mainImage) => {
    const cartList = useCartStore(state => state.cartList);
    const createUpdateItem = useCartStore(state => state.createUpdateItem);

    const [cartItem, setCartItem] = useState({});

    const isInCart = cartList.some(
        item => item.productId === product.id
    );

    useEffect(() => {
        if (!product || !product.id) return;

        setCartItem({
            productId: product.id,
            name: product.name,
            sizeName: product.sizeName,
            imageName: mainImage || (product.productImages?.length > 0 ? product.productImages[0].name : null),
            quantity: 1,
            categoryName: product.category?.name,
            price: product.price
        });

    }, [product, mainImage]);

    const addToCart = () => {
        createUpdateItem(cartItem);
    };

    return { cartItem, isInCart, addToCart };
};
