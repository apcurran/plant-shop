import create from "zustand";

const store = (set, get) => ({
    items: [],
    totalQuantity: 0,
    // Funcs
    addItemToCart: (newItem) => {
        debugger;

        const currItemsArr = get().items;
        const existingItem = currItemsArr.find((item) => item.productId === newItem.productId);
        // Incr total qty by 1
        set((state) => ({ totalQuantity: state.totalQuantity + 1 }));
        
        if (!existingItem) {
            const currNewItem = {
                // Fields needed for item
                productId: newItem.productId,
                productExtraInfoId: newItem.productExtraInfoId,
                title: newItem.title,
                size: newItem.size,
                price: newItem.price,
                itemTotalPrice: newItem.price,
                itemQuantity: 1,
                imgPublicId: newItem.imgPublicId,
                imgAltTxt: newItem.imgAltTxt,
                imgWidth: newItem.imgWidth,
                imgHeight: newItem.imgHeight
            };
            // Add item to items arr
            set((state) => ({ items: [...state.items, currNewItem] }));
        } else {
            // newItem already exists in items arr
            currItemsArr.map((item) => {
                // Update single currently pre-existing item
                if (item.productId === newItem.productId) {
                    return {
                        ...item,
                        // Inc item qty by 1
                        itemQuantity: item.itemQuantity + 1,
                        // Update item total price
                        itemTotalPrice: item.itemTotalPrice + newItem.price
                    };
                }

                return { ...item };
            });
        }
    }
});

const useCartStore = create(store);

export default useCartStore;