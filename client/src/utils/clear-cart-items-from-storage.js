function clearCartItemsFromStorage() {
    sessionStorage.removeItem("items");
    sessionStorage.removeItem("totalQuantity");
}

export { clearCartItemsFromStorage };