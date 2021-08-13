import create from "zustand";

const store = (set, get) => ({
    items: [],
    totalQuantity: 0,
    addItemToCart: (newItem) => {
        debugger;

        const currItemsArr = get().items;
        const existingItem = currItemsArr.find((item) => {
            // Same item, and same sizing price
            return item.productId === newItem.productId && item.productExtraInfoId === newItem.productExtraInfoId;
        });
        // Incr total qty by 1
        set((state) => ({ totalQuantity: state.totalQuantity + 1 }));
        
        if (!existingItem) {
            const currNewItem = {
                // Fields needed for new item
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
            set({ items: [...currItemsArr, currNewItem] });
        } else {
            // newItem already exists in items arr
            const updatedItemsArr = currItemsArr.map((item) => {
                if (item.productId === newItem.productId && item.productExtraInfoId === newItem.productExtraInfoId) {
                    return {
                        // Copy old obj properties
                        ...item,
                        // Update item qty by 1
                        itemQuantity: item.itemQuantity + 1,
                        // Update item total price
                        itemTotalPrice: item.itemTotalPrice + newItem.price
                    };
                }

                return { ...item };
            });

            set({ items: updatedItemsArr });
        }
    },
    incrementOneItem: () => {
        
    },
    decrementOneItem: () => {

    },
    removeItemFromCart: (productId, productExtraInfoId) => {
        // Removes item regardless of item quantity in cart
        // NOTE: NOT TESTED YET
        const currItemsArr = get().items;
        let qtyToDecrement = 0;
        const updatedItemsArr = currItemsArr.filter((item) => {
            if (item.productId !== productId && item.productExtraInfoId !== productExtraInfoId) {
                qtyToDecrement = item.itemQuantity;

                return true;
            }

            return false;
        });

        set((state) => ({ items: updatedItemsArr, totalQuantity: state.totalQuantity - qtyToDecrement }));
    },
    clearCart: () => {
        // NOTE: NOT TESTED YET
        set({ items: [], totalQuantity: 0 });
    }
});

const useCartStore = create(store);

export default useCartStore;