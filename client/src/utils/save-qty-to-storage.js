function saveQtyToStorage(qtyAmt) {
    sessionStorage.setItem("totalQuantity", qtyAmt);

    return;
}

export { saveQtyToStorage };