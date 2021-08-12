import create from "zustand";

const store = (set) => ({
    items: [],
    totalQuantity: 0
});

const useCartStore = create(store);

export default useCartStore;