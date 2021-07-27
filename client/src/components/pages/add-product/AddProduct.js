import { Redirect } from "react-router-dom";

function AddProduct() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    // Route guard
    if (!userInfo.isAdmin) {
        return <Redirect to="/admin/auth/log-in" />;
    }

    return (
        <div>
            <h1>Add Product</h1>
        </div>
    );
}

export default AddProduct;
