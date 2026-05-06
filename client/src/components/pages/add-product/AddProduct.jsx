import { Navigate } from "react-router-dom";

import "./AddProduct.css";
import Header from "../../layout/header/Header";
import MainWrapper from "../../layout/main-wrapper/MainWrapper";
import TitleBar from "../../ui/title-bar/TitleBar";
import CollectionNav from "../shop/collection-nav/CollectionNav";
import AddProductForm from "./add-product-form/AddProductForm";

function AddProduct() {
    const isAdmin = sessionStorage.getItem("isAdmin");

    // Route guard
    // String val pulled from sessionStorage
    if (isAdmin === "false" || isAdmin === null) {
        return <Navigate to="/admin/auth/log-in" />;
    }

    return (
        <div className="add-product">
            <Header />
            <MainWrapper>
                <TitleBar>Add Product (Admin)</TitleBar>
                <div className="add-product-inner-wrapper">
                    <CollectionNav />
                    <div className="add-product-inner-wrapper__right">
                        <AddProductForm />
                    </div>
                </div>
            </MainWrapper>
        </div>
    );
}

export default AddProduct;
