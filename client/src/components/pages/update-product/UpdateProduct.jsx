import { useParams, Navigate } from "react-router-dom";

import "../add-product/AddProduct.css";
import Header from "../../layout/header/Header";
import MainWrapper from "../../layout/main-wrapper/MainWrapper";
import TitleBar from "../../ui/title-bar/TitleBar";
import CollectionNav from "../shop/collection-nav/CollectionNav";
import UpdateProductForm from "./update-product-form/UpdateProductForm";

function UpdateProduct() {
    const { productId } = useParams();
    const isAdmin = sessionStorage.getItem("isAdmin");

    // Route guard
    if (isAdmin === "false" || isAdmin === null) {
        return <Navigate to="/admin/auth/log-in" />;
    }

    return (
        <div className="update-product add-product">
            <Header />
            <MainWrapper>
                <TitleBar>Update Product (Admin)</TitleBar>
                <div className="add-product-inner-wrapper">
                    <CollectionNav />
                    <div className="add-product-inner-wrapper__right">
                        <UpdateProductForm productId={productId} />
                    </div>
                </div>
            </MainWrapper>
        </div>
    );
}

export default UpdateProduct;
