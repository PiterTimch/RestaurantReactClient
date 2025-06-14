import { create } from "zustand";
import {useCartStore} from "./cartStore";

export const useAuthStore = create((set) => ({
    user: null,
    setUser: (user) => {
        set({ user })

        const fetchCart = useCartStore.getState().fetchCart;

        fetchCart();
        localStorage.removeItem("cart-storage");
    },
    logout: () => {
        localStorage.removeItem("jwt");
        set({ user: null });

        const clearCart = useCartStore.getState().clearCart;
        clearCart();
        localStorage.removeItem("cart-storage");
    },
}));
