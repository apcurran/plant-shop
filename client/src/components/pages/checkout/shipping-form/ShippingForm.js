import "./ShippingForm.css";

function ShippingForm() {
    return (
        <form className="shipping-grid__form">
            <div className="shipping-grid__form-group">
                <label htmlFor="first-name" className="shipping-grid__form-group__label">First Name</label>
                <input type="text" className="shipping-grid__form-group__input" id="first-name" />
            </div>
            <div className="shipping-grid__form-group">
                <label htmlFor="last-name" className="shipping-grid__form-group__label">Last Name</label>
                <input type="text" className="shipping-grid__form-group__input" id="last-name" />
            </div>
            <div className="shipping-grid__form-group">
                <label htmlFor="street" className="shipping-grid__form-group__label">Street Address</label>
                <input type="text" className="shipping-grid__form-group__input shipping-grid__form-group__input--long" id="street" />
            </div>
            <div className="shipping-grid__form-group">
                <label htmlFor="city" className="shipping-grid__form-group__label">City</label>
                <input type="text" className="shipping-grid__form-group__input" id="city" />
            </div>
            <div className="shipping-grid__form-group">
                <label htmlFor="state" className="shipping-grid__form-group__label">State</label>
                <input type="text" className="shipping-grid__form-group__input" id="state" />
            </div>
            <div className="shipping-grid__form-group">
                <label htmlFor="zip" className="shipping-grid__form-group__label">Zip Code</label>
                <input type="text" className="shipping-grid__form-group__input" id="zip" />
            </div>
        </form>
    );
}

export default ShippingForm;
