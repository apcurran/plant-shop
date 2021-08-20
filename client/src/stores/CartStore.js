import create from "zustand";

const store = (set, get) => ({
    items: [],
    totalQuantity: 0,
    addItemToCart: (newItem) => {
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
    incrementOneItem: (existingItem) => {
        const currItemsArr = get().items;
        const updatedExistingItemsArr = currItemsArr.map((item) => {
            if (item.productId === existingItem.productId && item.productExtraInfoId === existingItem.productExtraInfoId) {
                // Update existing item qty and price
                return {
                    ...existingItem,
                    itemQuantity: existingItem.itemQuantity + 1,
                    itemTotalPrice: existingItem.itemTotalPrice + existingItem.price
                }
            }

            return item;
        });

        // Update totalQuantity by one and items arr with updated item info
        set((state) => ({ items: updatedExistingItemsArr, totalQuantity: state.totalQuantity + 1 }));
    },
    decrementOneItem: (existingItem) => {
        const currItemsArr = get().items;
        const qtyToDecrement = 1;
        let updatedExistingItemsArr;

        if (existingItem.itemQuantity === 1) {
            // When qty of one left, remove item from cart completely
            updatedExistingItemsArr = currItemsArr.filter((item) => {
                if (item.productId !== existingItem.productId || item.productExtraInfoId !== existingItem.productExtraInfoId) {
                    // Keep in arr
                    return true;
                }
    
                // Remove from arr
                return false;
            });

        } else {
            // Map over and decrement item's qty
            updatedExistingItemsArr = currItemsArr.map((item) => {
                if (item.productId === existingItem.productId && item.productExtraInfoId === existingItem.productExtraInfoId) {
                    // Update existing item qty and price
                    return {
                        ...existingItem,
                        itemQuantity: existingItem.itemQuantity - 1,
                        itemTotalPrice: existingItem.itemTotalPrice - existingItem.price
                    }
                }
    
                return item;
            });
        }

        set((state) => ({ items: updatedExistingItemsArr, totalQuantity: state.totalQuantity - qtyToDecrement }));
    },
    removeItemFromCart: (productId, productExtraInfoId) => {
        // Removes item regardless of item quantity in cart
        const currItemsArr = get().items;
        let qtyToDecrement = 0;
        const updatedItemsArr = currItemsArr.filter((item) => {
            if (item.productId !== productId || item.productExtraInfoId !== productExtraInfoId) {
                // Keep in arr
                return true;
            }

            // Remove from arr
            qtyToDecrement = item.itemQuantity;

            return false;
        });

        set((state) => ({ items: updatedItemsArr, totalQuantity: state.totalQuantity - qtyToDecrement }));
    },
    sendCartData: () => {
        const currItemsArr = get().items;
        const totalQty = get().totalQuantity;
        console.table(currItemsArr);
        console.log(totalQty);
    }
});

const useCartStore = create(store);

export default useCartStore;