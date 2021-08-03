import { Link } from "react-router-dom";

import "./AdminUpdateProductLink.css";

function AdminUpdateProductLink({ productId }) {
    return (
        <Link to={`/admin/collections/update-product/${productId}`} className="admin-update-product-link">Update</Link>
    );
}

export default AdminUpdateProductLink;
