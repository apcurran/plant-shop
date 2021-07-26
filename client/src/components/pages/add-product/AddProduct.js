import { Redirect } from "react-router-dom";

import useAuthStore from "../../../stores/AuthStore";

function AddProduct() {
    const isAdmin = useAuthStore((state) => state.user.isAdmin);

    if (!isAdmin) {
        return <Redirect to="/admin/auth/log-in" />;
    }

    return (
        <div>
            Add Product
        </div>
    );
}

export default AddProduct;
