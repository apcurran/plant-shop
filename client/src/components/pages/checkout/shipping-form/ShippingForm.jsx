import { useState } from "react";

import "./ShippingForm.css";
import useAuthStore from "../../../../stores/AuthStore";
import useCartStore from "../../../../stores/CartStore";
import ErrorMsg from "../../../ui/error-msg/ErrorMsg";
import LoadingSpinner from "../../../ui/loading-spinner/LoadingSpinner";

function ShippingForm() {
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // Global store state
    const token = useAuthStore((state) => state.token);
    const cartItemsArr = useCartStore((state) => state.items);
    const cartTotalQty = useCartStore((state) => state.totalQuantity);

    function handleStreetChange(event) {
        setStreet(event.target.value);
    }

    function handleCityChange(event) {
        setCity(event.target.value);
    }

    function handleStateChange(event) {
        setState(event.target.value);
    }

    function handleZipChange(event) {
        setZip(event.target.value);
    }

    function validateOrderData(userData, cartItemsArr) {
        if (!Array.isArray(cartItemsArr) || cartItemsArr.length === 0) {
            throw new Error("Your cart is empty. Add items before checkout.");
        }

        for (const item of cartItemsArr) {
            if (
                !Number.isInteger(item.itemQuantity) ||
                item.itemQuantity <= 0
            ) {
                throw new Error(
                    `Invalid quantity for ${item.title}. Quantity must be a positive number.`,
                );
            }

            if (typeof item.price !== "number" || item.price <= 0) {
                throw new Error(
                    `Invalid price for ${item.title}. Price must be positive.`,
                );
            }
        }

        // Validate shipping address fields
        if (!userData.street || userData.street.trim() === "") {
            throw new Error("Street address is required.");
        }
        if (!userData.city || userData.city.trim() === "") {
            throw new Error("City is required.");
        }
        if (!userData.state || userData.state.trim() === "") {
            throw new Error("State is required.");
        }
        if (!userData.zip || userData.zip.trim() === "") {
            throw new Error("Zip code is required.");
        }

        const zipRegex = /^\d{5}(-\d{4})?$/;

        if (!zipRegex.test(userData.zip)) {
            throw new Error(
                "Zip code must be valid (e.g., 12345 or 12345-6789).",
            );
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");
        setIsLoading(true);

        const userData = {
            street,
            city,
            state,
            zip,
        };
        const cartData = {
            currItemsArr: cartItemsArr,
            totalQty: cartTotalQty,
        };

        try {
            // Validate all data before sending to API
            validateOrderData(userData, cartItemsArr);

            const response = await fetch(
                "/api/orders/create-checkout-session",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        userData,
                        cartData,
                    }),
                },
            );

            // Check for errors
            if (!response.ok) {
                const serverErrMsg = await response.json();

                throw Error(serverErrMsg.error);
            }

            setIsLoading(false);

            const { url } = await response.json();
            // Push to Stripe API generated URL
            window.location = url;
        } catch (err) {
            setIsLoading(false);
            setError(err.message);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="shipping-grid__form">
            <div className="shipping-grid__form-group">
                <label
                    htmlFor="street"
                    className="shipping-grid__form-group__label"
                >
                    Street Address
                </label>
                <input
                    onChange={handleStreetChange}
                    type="text"
                    className="shipping-grid__form-group__input shipping-grid__form-group__input--long"
                    id="street"
                    autoComplete="street-address"
                    enterKeyHint="next"
                />
            </div>
            <div className="shipping-grid__form-group">
                <label
                    htmlFor="city"
                    className="shipping-grid__form-group__label"
                >
                    City
                </label>
                <input
                    onChange={handleCityChange}
                    type="text"
                    className="shipping-grid__form-group__input"
                    id="city"
                    autoComplete="address-level2"
                    enterKeyHint="next"
                />
            </div>
            <div className="shipping-grid__form-group">
                <label
                    htmlFor="state"
                    className="shipping-grid__form-group__label"
                >
                    State (abbrev.)
                </label>
                <input
                    onChange={handleStateChange}
                    type="text"
                    className="shipping-grid__form-group__input"
                    id="state"
                    maxLength={2}
                    autoComplete="address-level1"
                    enterKeyHint="next"
                />
            </div>
            <div className="shipping-grid__form-group">
                <label
                    htmlFor="zip"
                    className="shipping-grid__form-group__label"
                >
                    Zip Code
                </label>
                <input
                    onChange={handleZipChange}
                    type="text"
                    className="shipping-grid__form-group__input"
                    id="zip"
                    autoComplete="postal-code"
                    enterKeyHint="done"
                />
            </div>
            {isLoading ? <LoadingSpinner /> : null}
            {error ? <ErrorMsg error={error} /> : null}
            <button className="shipping-grid__form__submit-btn cta-btn">
                Checkout
            </button>
        </form>
    );
}

export default ShippingForm;
