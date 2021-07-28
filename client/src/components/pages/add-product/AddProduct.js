import { Redirect } from "react-router-dom";

import Header from "../../layout/header/Header";
import MainWrapper from "../../layout/main-wrapper/MainWrapper";
import TitleBar from "../../ui/title-bar/TitleBar";

function AddProduct() {
    const isAdmin = localStorage.getItem("isAdmin");

    // Route guard
    // String val pulled from localStorage
    if (isAdmin === "false" || isAdmin === null) {
        return <Redirect to="/admin/auth/log-in" />;
    }

    return (
        <div className="add-product">
            <Header />
            <MainWrapper>
                <TitleBar>Add Product (Admin)</TitleBar>
            </MainWrapper>
        </div>
    );
}

export default AddProduct;
