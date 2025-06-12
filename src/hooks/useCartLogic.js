import { useEffect, useState } from "react";
import {useCartStore} from "../store/cartStore";

export const useCartLogic = (product, mainImage, selectedVariant = null ) => {
    const cartList = useCartStore(state => state.cartList);
    const addItem = useCartStore(state => state.addItem);

    const [cartItem, setCartItem] = useState({});

    const isInCart = cartList.some(
        item => item.name === (selectedVariant ? selectedVariant.name : product.name) //доробити через ID
    );

    useEffect(() => {
        if (!product || !product.id) return;

        setCartItem({
            id: selectedVariant ? selectedVariant.id : product.id,
            name: product.name,
            imageName: mainImage || (product.productImages?.length > 0 ? product.productImages[0].name : null),
            quantity: 1,
            categoryName: product.category?.name,
            price: selectedVariant ? selectedVariant.price : product.price
        });
    }, [product, selectedVariant, mainImage]);

    const addToCart = () => {
        addItem(cartItem);
    };

    return { cartItem, isInCart, addToCart };
};
