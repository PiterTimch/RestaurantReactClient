import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
    persist(
        (set, get) => ({
            cartList: [],

            addItem: (item) => {
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
            },

            removeItem: (id) => {
                set({
                    cartList: get().cartList.filter(i => i.id !== id),
                });
            },

            updateQuantity: (id, newQuantity) => {
                set({
                    cartList: get().cartList.map((item) =>
                        item.id === id ? { ...item, quantity: newQuantity } : item
                    ),
                });
            }
        }),
        {
            name: 'cart-storage', // ключ у localStorage
        }
    )
);
