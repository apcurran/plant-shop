const currencyFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

function formatCurrency(totalCost) {
    return currencyFormatter.format(totalCost);
}

export { formatCurrency };