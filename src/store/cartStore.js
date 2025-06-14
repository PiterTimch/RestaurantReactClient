import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {useAuthStore} from "./authStore";
import axiosInstance from "../api/axiosInstance";

export const useCartStore = create(
    persist(
        (set, get) => ({
            cartList: [],

            createUpdateItem: async (item) => {
                const user = useAuthStore.getState().user;

                if (user) {
                    await axiosInstance.post('/api/cart/createUpdate', {
                        productId: item.productId,
                        quantity: item.quantity
                    });

                    const res = await axiosInstance.get(`/api/cart/getCart`);
                    set({ cartList: res.data.items });

                } else {

                    const existing = get().cartList.find(i => i.productId === item.productId);
                    if (existing) {
                        set({
                            cartList: get().cartList.map(i =>
                                i.productId === item.productId ? { ...i, quantity: item.quantity } : i
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
                    const res = await axiosInstance.get(`/api/cart/getCart`);
                    set({ cartList: res.data.items });
                } else {
                    set({
                        cartList: get().cartList.filter(i => i.productId !== id),
                    });
                }
            },

            clearCart: () => {
                set({ cartList: [] });
            },

            fetchCart: async () => {
                const user = useAuthStore.getState().user;
                if (!user) return;

                const localItems = get().cartList;

                // Якщо є локальні товари — додаємо їх у БД
                if (localItems.length > 0) {
                    await Promise.all(localItems.map(item =>
                        axiosInstance.post('/api/cart/createUpdate', {
                            productId: item.productId,
                            quantity: item.quantity,
                        })
                    ));
                }

                const res = await axiosInstance.get(`/api/cart/getCart`);
                set({ cartList: res.data.items });
            }
        }),
        {
            name: 'cart-storage',
        }
    )
);
