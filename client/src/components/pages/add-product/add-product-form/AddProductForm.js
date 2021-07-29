import { useState, useEffect } from "react";

import "./AddProductForm.css";
import FormSegment from "../../../ui/form-segment/FormSegment";
import NumberBadge from "../../../ui/number-badge/NumberBadge";
import FilePreviewPlaceholder from "./file-preview/FilePreviewPlaceholder";
import FilePreview from "./file-preview/FilePreview";

function AddProductForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [smallAmt, setSmallAmt] = useState(0);
    const [smallPrice, setSmallPrice] = useState(0);
    const [medAmt, setMedAmt] = useState(0);
    const [medPrice, setMedPrice] = useState(0);
    const [lgAmt, setLgAmt] = useState(0);
    const [lgPrice, setLgPrice] = useState(0);
    const [selectedImgFile, setSelectedImgFile] = useState(null);
    const [selectedImgPreview, setSelectedImgPreview] = useState(null);
    const [selectedImgAltTxt, setSelectedImgAltTxt] = useState("");
    const [category, setCategory] = useState("house plants");

    // Img Preview useEffect logic
    useEffect(() => {
        if (!selectedImgFile) return;

        const objectUrl = URL.createObjectURL(selectedImgFile);
        setSelectedImgPreview(objectUrl);

        // Cleanup after
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedImgFile]);

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

    // Img File
    function handleSelectedFile(event) {
        if (!event.target.files || event.target.files.length === 0) {
            return;
        }

        const selectedImg = event.target.files[0];
        setSelectedImgFile(selectedImg);
    }

    function handleFileAltTxtChange(event) {
        setSelectedImgAltTxt(event.target.value);
    }

    // Form Submit
    function handleSubmit(event) {
        event.preventDefault();

        // TODO: Handle loading spinner
        
        let formData = new FormData();
        // formData vals converted to strings or blob (file)
        // Base img data
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        // Img sizing data
        formData.append("smAmt", smallAmt);
        formData.append("smPrice", smallPrice);
        formData.append("medAmt", medAmt);
        formData.append("medPrice", medPrice);
        formData.append("lgAmt", lgAmt);
        formData.append("lgPrice", lgPrice);
        // Img file data
        formData.append("productImg", selectedImgFile);
        formData.append("imgAltText", selectedImgAltTxt);
    }

    // JSX elems
    const uploadPreview = selectedImgFile ? <FilePreview selectedImgPreview={selectedImgPreview} selectedImgAltTxt={selectedImgAltTxt} /> : <FilePreviewPlaceholder />;

    return (
        <form onSubmit={handleSubmit} className="add-product__form" encType="multipart/form-data">
            <FormSegment>
                <div className="add-product__form__column--left">
                    <NumberBadge>1</NumberBadge>
                    <h2>Product Info</h2>
                </div>
                <div className="add-product__form__column--right">
                    <div className="form-group">
                        <label htmlFor="title" className="form-group__label">Title</label>
                        <input onChange={handleTitleChange} id="title" type="text" className="form-group__input" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description" className="form-group__label">Description</label>
                        <textarea onChange={handleDescriptionChange} id="description" rows="10" className="form-group__textarea" required></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="category" className="form-group__label">Category</label>
                        <select value={category} onChange={handleSelectChange} id="category" className="form-group__select" required>
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
                            <input onChange={handleSmallAmtChange} id="size-small-amt" type="number" className="form-group__input" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="size-small-price" className="form-group__label">Price</label>
                            <input onChange={handleSmallPriceChange} id="size-small-price" type="number" className="form-group__input" required/>
                        </div>
                    </div>
                    <div className="add-product__form__sizes-group">
                        <h3 className="add-product__form__sub-heading">Size Medium</h3>
                        <div className="form-group">
                            <label htmlFor="size-medium-amt" className="form-group__label">Gallon Amount</label>
                            <input onChange={handleMediumAmtChange} id="size-medium-amt" type="number" className="form-group__input" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="size-medium-price" className="form-group__label">Price</label>
                            <input onChange={handleMediumPriceChange} id="size-medium-price" type="number" className="form-group__input" required/>
                        </div>
                    </div>
                    <div className="add-product__form__sizes-group">
                        <h3 className="add-product__form__sub-heading">Size Large</h3>
                        <div className="form-group">
                            <label htmlFor="size-large-amt" className="form-group__label">Gallon Amount</label>
                            <input onChange={handleLargeAmtChange} id="size-large-amt" type="number" className="form-group__input" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="size-large-price" className="form-group__label">Price</label>
                            <input onChange={handleLargePriceChange} id="size-large-price" type="number" className="form-group__input" required/>
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
                    <div className="form-group">
                        <label htmlFor="img-file" className="form-group__label">Select Image File</label>
                        <input onChange={handleSelectedFile} type="file" id="img-file" className="add-product__form__file-input" required/>
                        {uploadPreview}
                    </div>
                    <div className="form-group">
                        <label htmlFor="img-alt-txt" className="form-group__label">Image Alt Text</label>
                        <textarea onChange={handleFileAltTxtChange} id="img-alt-txt" rows="3" className="form-group__textarea" required></textarea>
                    </div>
                </div>
            </FormSegment>
            <button type="submit" className="add-product__form__submit-btn">Submit</button>
        </form>
    );
}

export default AddProductForm;
