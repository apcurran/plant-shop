function saveCartItemsToStorage(itemsArr) {
    sessionStorage.setItem("items", JSON.stringify(itemsArr));

    return;
}

export { saveCartItemsToStorage };