import { useState } from "react";

import "./ShippingForm.css";
import useAuthStore from "../../../../stores/AuthStore";
import useCartStore from "../../../../stores/CartStore";

function ShippingForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
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

    function handleFirstNameChange(event) {
        setFirstName(event.target.value);
    }

    function handleLastNameChange(event) {
        setLastName(event.target.value);
    }

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

    async function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true);

        const userData = {
            firstName,
            lastName,
            street,
            city,
            state,
            zip
        };
        const cartData = {
            currItemsArr: cartItemsArr,
            totalQty: cartTotalQty
        };
        
        try {
            const response = await fetch("/api/orders/create-checkout-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    userData,
                    cartData
                })
            });

            // Check for errors
            if (!response.ok) {
                const serverErrMsg = await response.json();

                throw Error(serverErrMsg.error);
            }

            const { url } = await response.json();
            // Push to Stripe API generated URL
            window.location = url;

        } catch (err) {
            setIsLoading(false);
            setError(err);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="shipping-grid__form">
            <div className="shipping-grid__form-group">
                <label htmlFor="first-name" className="shipping-grid__form-group__label">First Name</label>
                <input onChange={handleFirstNameChange} type="text" className="shipping-grid__form-group__input" id="first-name" />
            </div>
            <div className="shipping-grid__form-group">
                <label htmlFor="last-name" className="shipping-grid__form-group__label">Last Name</label>
                <input onChange={handleLastNameChange} type="text" className="shipping-grid__form-group__input" id="last-name" />
            </div>
            <div className="shipping-grid__form-group">
                <label htmlFor="street" className="shipping-grid__form-group__label">Street Address</label>
                <input onChange={handleStreetChange} type="text" className="shipping-grid__form-group__input shipping-grid__form-group__input--long" id="street" />
            </div>
            <div className="shipping-grid__form-group">
                <label htmlFor="city" className="shipping-grid__form-group__label">City</label>
                <input onChange={handleCityChange} type="text" className="shipping-grid__form-group__input" id="city" />
            </div>
            <div className="shipping-grid__form-group">
                <label htmlFor="state" className="shipping-grid__form-group__label">State</label>
                <input onChange={handleStateChange} type="text" className="shipping-grid__form-group__input" id="state" />
            </div>
            <div className="shipping-grid__form-group">
                <label htmlFor="zip" className="shipping-grid__form-group__label">Zip Code</label>
                <input onChange={handleZipChange} type="text" className="shipping-grid__form-group__input" id="zip" />
            </div>
            <button className="shipping-grid__form__submit-btn cta-btn">Checkout</button>
        </form>
    );
}

export default ShippingForm;
