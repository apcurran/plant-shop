import { useEffect, useState, useCallback } from "react";

import useAuthStore from "../../../stores/AuthStore";

import Header from "../../layout/header/Header";
import MainWrapper from "../../layout/main-wrapper/MainWrapper";
import TitleBar from "../../ui/title-bar/TitleBar";
import ErrorMsg from "../../ui/error-msg/ErrorMsg";
import LoadingSpinner from "../../ui/loading-spinner/LoadingSpinner";

function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Global store state
    const token = useAuthStore(
        useCallback((state) => state.token, [])
    );

    useEffect(() => {
        async function getOrders() {
            setIsLoading(true);

            try {
                const response = await fetch("/api/orders/order-history", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                // Check for errors
                if (!response.ok) {
                    const serverErrMsg = await response.json();

                    throw Error(serverErrMsg.error);
                }

                setIsLoading(false);

                const data = await response.json();
                setOrders(data);

            } catch (err) {
                setIsLoading(false);
                setError(err);
            }
        }

        if (token) getOrders();
    }, [token]);

    // JSX elems
    const errorMsg = error ? <ErrorMsg error={error} /> : null;
    const loadingSpinner = isLoading ? <LoadingSpinner /> : null;

    return (
        <div className="order-history">
            <Header />
            <MainWrapper>
                <TitleBar>Order History</TitleBar>
                {errorMsg}
                {loadingSpinner}
            </MainWrapper>
        </div>
    );
}

export default OrderHistory;
