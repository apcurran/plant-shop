import { useState } from "react";

import "./AddProductForm.css";
import FormSegment from "../../../ui/form-segment/FormSegment";
import NumberBadge from "../../../ui/number-badge/NumberBadge";

function AddProductForm() {
    const [category, setCategory] = useState("house plants");

    function handleSelect(event) {
        setCategory(event.target.value);
    }

    return (
        <form className="add-product__form">
            <FormSegment>
                <div className="add-product__form__column--left">
                    <NumberBadge>1</NumberBadge>
                    <h2>Product Info</h2>
                </div>
                <div className="add-product__form__column--right">
                    <div className="form-group">
                        <label htmlFor="title" className="form-group__label">Title</label>
                        <input id="title" type="text" className="form-group__input" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description" className="form-group__label">Description</label>
                        <input id="description" type="text" className="form-group__input" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category" className="form-group__label">Category</label>
                        <select value={category} onChange={handleSelect} id="category" className="form-group__select">
                            <option value="house plants">House Plant</option>
                            <option value="fruit trees">Fruit Tree</option>
                            <option value="shade trees">Shade Tree</option>
                        </select>
                    </div>
                </div>
            </FormSegment>
            <FormSegment>
                <div className="add-product__form__column--left">
                    <NumberBadge>2</NumberBadge>
                    <h2>Product Sizes</h2>
                </div>
                <div className="add-product__form__column--right">
                    <h3>Title</h3>
                </div>
            </FormSegment>
            <FormSegment>
                <div className="add-product__form__column--left">
                    <NumberBadge>3</NumberBadge>
                    <h2>Image Info</h2>
                </div>
                <div className="add-product__form__column--right">
                    <h3>Title</h3>
                </div>
            </FormSegment>
        </form>
    );
}

export default AddProductForm;
