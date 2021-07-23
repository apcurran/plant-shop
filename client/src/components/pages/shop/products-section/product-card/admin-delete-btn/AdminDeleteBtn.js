import useProductsStore from "../../../../../../stores/ProductsStore";

function AdminDeleteBtn({ productId, adminToken }) {
    const products = useProductsStore((state) => state.products);
    const setProducts = useProductsStore((state) => state.setProducts);

    async function deleteProductHandler(productId, adminToken) {
        try {
            await fetch(`/api/products/${productId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${adminToken}`
                }
            });

            // Update products store state after successful deletion
            const updatedProductsData = products.filter((product) => product.productId !== Number(productId));

            setProducts(updatedProductsData);

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <button onClick={() => deleteProductHandler(productId, adminToken)} className="shop__products-section__card__delete-btn">Delete</button>
    );
}

export default AdminDeleteBtn;
