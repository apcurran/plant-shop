import create from "zustand";

import { saveCartItemsToStorage } from "../utils/save-cart-items-to-storage";
import { saveQtyToStorage } from "../utils/save-qty-to-storage";

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
        const currTotalQty = get().totalQuantity + 1;
        set({ totalQuantity: currTotalQty });
        saveQtyToStorage(currTotalQty);
        
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

            const updatedItemsArr = [...currItemsArr, currNewItem];
            set({ items: updatedItemsArr });
            saveCartItemsToStorage(updatedItemsArr);
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
            saveCartItemsToStorage(updatedItemsArr);
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

        // Calc curr total qty and use for sessionStorage AND zustand store state
        const currTotalQty = get().totalQuantity + 1;
        saveQtyToStorage(currTotalQty);

        set({ items: updatedExistingItemsArr, totalQuantity: currTotalQty });
        saveCartItemsToStorage(updatedExistingItemsArr);
    },
    decrementOneItem: (existingItem) => {
        const currItemsArr = get().items;
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

        // Calc currTotalQty and re-use for sessionStorage and store states
        const currTotalQty = get().totalQuantity - 1; // Decrement by one
        set({ items: updatedExistingItemsArr, totalQuantity: currTotalQty });
        
        saveQtyToStorage(currTotalQty);
        saveCartItemsToStorage(updatedExistingItemsArr);
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

        const currTotalQty = get().totalQuantity - qtyToDecrement;
        set({ items: updatedItemsArr, totalQuantity: currTotalQty });

        saveQtyToStorage(currTotalQty);
        saveCartItemsToStorage(updatedItemsArr);
    },
    sendCartData: async (token) => {
        const currItemsArr = get().items;
        const totalQty = get().totalQuantity;
        const cartData = {
            currItemsArr,
            totalQty
        };

        try {
            const response = await fetch("/api/orders/create-checkout-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(cartData)
            });

            // Check for errors
            if (!response.ok) {
                const serverErrMsg = await response.json();

                throw Error(serverErrMsg.error);
            }

            const { url } = await response.json();
            // Push to Stripe API generated URL
            window.location = url;

        } catch (err) {
            console.error(err);
        }
    },
    setItems: (itemsArr) => set((state) => ({ items: itemsArr })),
    setTotalQuantity: (qtyAmt) => set((state) => ({ totalQuantity: qtyAmt }))
});

const useCartStore = create(store);

export default useCartStore;