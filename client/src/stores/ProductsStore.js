import create from "zustand";

const store = (set) => ({
    products: [],
    setProducts: (updatedProductsArr) => set((state) => ({ products: updatedProductsArr }))
});

const useProductsStore = create(store);

export default useProductsStore;