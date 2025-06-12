// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
//
// export const useCartStore = create(
//     persist(
//         (set, get) => ({
//             cartList: [],
//
//             addItem: (item) => {
//                 const existing = get().cartList.find(i => i.id === item.id);
//
//                 if (existing) {
//                     set({
//                         cartList: get().cartList.map(i =>
//                             i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
//                         ),
//                     });
//                 } else {
//                     set({ cartList: [...get().cartList, item] });
//                 }
//             },
//
//             removeItem: (id) => {
//                 set({
//                     cartList: get().cartList.filter(i => i.id !== id),
//                 });
//             },
//
//             updateQuantity: (id, newQuantity) => {
//                 set({
//                     cartList: get().cartList.map((item) =>
//                         item.id === id ? { ...item, quantity: newQuantity } : item
//                     ),
//                 });
//             }
//         }),
//         {
//             name: 'cart-storage', // ключ у localStorage
//         }
//     )
// );


import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {useAuthStore} from "./authStore";
import axiosInstance from "../api/axiosInstance";

export const useCartStore = create(
    persist(
        (set, get) => ({
            cartList: [],
            setCartList: (cart) => set({ cartList: cart }),

            addItem: async (item) => {
                const user = useAuthStore.getState().user;

                if (user) {
                    await axiosInstance.post('/api/cart/addCartItem', {
                        userId: user.id,
                        productId: item.id,
                    });

                    const res = await axiosInstance.get(`/api/cart/getCart`, {
                        params: { userId: user.id }
                    });
                    set({ cartList: res.data.items });

                    console.log(res.data);

                } else {
                    const existing = get().cartList.find(i => i.id === item.id);
                    if (existing) {
                        set({
                            cartList: get().cartList.map(i =>
                                i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
                            ),
                        });
                    } else {
                        set({ cartList: [...get().cartList, item] });
                    }
                }
            },

            removeItem: async (id) => {
                const user = useAuthStore.getState().user;

                if (user) {
                    await axiosInstance.put(`/api/cart/removeCartItem/${id}`);
                    const res = await axiosInstance.get(`/api/cart/getCart`, {
                        params: { userId: user.id }
                    });
                    set({ cartList: res.data.items });
                } else {
                    set({
                        cartList: get().cartList.filter(i => i.id !== id),
                    });
                }
            },

            updateQuantity: async (id, newQuantity) => {
                const user = useAuthStore.getState().user;

                if (user) {
                    await axiosInstance.put('/api/cart/updateCartItemQuantity', {
                        cartItemId: id,
                        newQuantity,
                    });
                    const res = await axiosInstance.get(`/api/cart/getCart`, {
                        params: { userId: user.id }
                    });
                    set({ cartList: res.data.items });
                } else {
                    set({
                        cartList: get().cartList.map((item) =>
                            item.id === id ? { ...item, quantity: newQuantity } : item
                        ),
                    });
                }
            },

            clearCart: () => {
                set({ cartList: [] });
            },

            fetchCart: async () => {
                const user = useAuthStore.getState().user;
                if (!user) return;

                const res = await axiosInstance.get(`/api/cart/getCart`, {
                    params: { userId: user.id }
                });
                set({ cartList: res.data.items });
            }
        }),
        {
            name: 'cart-storage',
        }
    )
);
