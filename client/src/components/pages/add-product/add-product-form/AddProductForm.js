import { useState } from "react";

import "./AddProductForm.css";
import FormSegment from "../../../ui/form-segment/FormSegment";
import NumberBadge from "../../../ui/number-badge/NumberBadge";

function AddProductForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [smallAmt, setSmallAmt] = useState(0);
    const [smallPrice, setSmallPrice] = useState(0);
    const [medAmt, setMedAmt] = useState(0);
    const [medPrice, setMedPrice] = useState(0);
    const [lgAmt, setLgAmt] = useState(0);
    const [lgPrice, setLgPrice] = useState(0);
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

    // Small
    function handleSmallAmtChange(event) {
        setSmallAmt(event.target.value);
    }

    function handleSmallPriceChange(event) {
        setSmallPrice(event.target.value);
    }

    // Medium
    function handleMediumAmtChange(event) {
        setMedAmt(event.target.value);
    }

    function handleMediumPriceChange(event) {
        setMedPrice(event.target.value);
    }

    // Large
    function handleLargeAmtChange(event) {
        setLgAmt(event.target.value);
    }

    function handleLargePriceChange(event) {
        setLgPrice(event.target.value);
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
                    <div className="add-product__form__sizes-group">
                        <h3 className="add-product__form__sub-heading">Size Small</h3>
                        <div className="form-group">
                            <label htmlFor="size-small-amt" className="form-group__label">Gallon Amount</label>
                            <input onChange={handleSmallAmtChange} id="size-small-amt" type="number" className="form-group__input" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="size-small-price" className="form-group__label">Price</label>
                            <input onChange={handleSmallPriceChange} id="size-small-price" type="number" className="form-group__input" />
                        </div>
                    </div>
                    <div className="add-product__form__sizes-group">
                        <h3 className="add-product__form__sub-heading">Size Medium</h3>
                        <div className="form-group">
                            <label htmlFor="size-medium-amt" className="form-group__label">Gallon Amount</label>
                            <input onChange={handleMediumAmtChange} id="size-medium-amt" type="number" className="form-group__input" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="size-medium-price" className="form-group__label">Price</label>
                            <input onChange={handleMediumPriceChange} id="size-medium-price" type="number" className="form-group__input" />
                        </div>
                    </div>
                    <div className="add-product__form__sizes-group">
                        <h3 className="add-product__form__sub-heading">Size Large</h3>
                        <div className="form-group">
                            <label htmlFor="size-large-amt" className="form-group__label">Gallon Amount</label>
                            <input onChange={handleLargeAmtChange} id="size-large-amt" type="number" className="form-group__input" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="size-large-price" className="form-group__label">Price</label>
                            <input onChange={handleLargePriceChange} id="size-large-price" type="number" className="form-group__input" />
                        </div>
                    </div>
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
