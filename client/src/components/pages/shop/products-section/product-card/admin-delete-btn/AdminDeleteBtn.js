function AdminDeleteBtn({ deleteProductHandler, productId, adminToken }) {
    // async function deleteProductHandler() {
    //     try {
    //         await fetch(`/api/products/${productId}`, {
    //             method: "DELETE",
    //             headers: {
    //                 "Authorization": `Bearer ${adminToken}`
    //             }
    //         }) 

    //     } catch (err) {
            
    //     }
    // }

    return (
        <button onClick={() => deleteProductHandler(productId, adminToken)} className="shop__products-section__card__delete-btn">Delete</button>
    );
}

export default AdminDeleteBtn;
