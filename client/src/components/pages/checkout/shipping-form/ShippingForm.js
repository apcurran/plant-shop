import { useState, useEffect } from "react";

import "./ShippingForm.css";

function ShippingForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");

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

    function handleSubmit(event) {
        event.preventDefault();

        console.log("Submitting form...");
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
