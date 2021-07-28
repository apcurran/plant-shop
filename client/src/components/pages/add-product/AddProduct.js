import { Redirect } from "react-router-dom";

function AddProduct() {
    const isAdmin = localStorage.getItem("isAdmin");

    // Route guard
    // String val pulled from localStorage
    if (isAdmin === "false" || isAdmin === null) {
        return <Redirect to="/admin/auth/log-in" />;
    }

    return (
        <div>
            <h1>Add Product</h1>
        </div>
    );
}

export default AddProduct;
