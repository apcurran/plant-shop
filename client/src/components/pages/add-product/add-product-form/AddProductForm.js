import { useState } from "react";

import "./AddProductForm.css";
import FormSegment from "../../../ui/form-segment/FormSegment";
import NumberBadge from "../../../ui/number-badge/NumberBadge";

function AddProductForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("house plants");

    function handleTitleChange(event) {
        setTitle(event.target.value);
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value);
    }

    function handleSelectChange(event) {
        setCategory(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit} className="add-product__form" enctype="multipart/form-data">
            <FormSegment>
                <div className="add-product__form__column--left">
                    <NumberBadge>1</NumberBadge>
                    <h2>Product Info</h2>
                </div>
                <div className="add-product__form__column--right">
                    <div className="form-group">
                        <label htmlFor="title" className="form-group__label">Title</label>
                        <input onChange={handleTitleChange} id="title" type="text" className="form-group__input" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description" className="form-group__label">Description</label>
                        <textarea onChange={handleDescriptionChange} id="description" rows="10" className="form-group__textarea"></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="category" className="form-group__label">Category</label>
                        <select value={category} onChange={handleSelectChange} id="category" className="form-group__select">
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
