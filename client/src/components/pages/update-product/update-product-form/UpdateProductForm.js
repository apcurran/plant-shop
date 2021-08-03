import { useState, useEffect } from "react";

import "../../add-product/add-product-form/AddProductForm.css";
import FormSegment from "../../../ui/form-segment/FormSegment";
import NumberBadge from "../../../ui/number-badge/NumberBadge";
import FilePreview from "../../add-product/add-product-form/file-preview/FilePreview";
import ErrorMsg from "../../../ui/error-msg/ErrorMsg";
import LoadingSpinner from "../../../ui/loading-spinner/LoadingSpinner";
import Message from "../../../ui/message/Message";

import useAuthStore from "../../../../stores/AuthStore";

function UpdateProductForm({ productId }) {
    // Store state
    const token = useAuthStore((state) => state.token);

    // Updated product data
    const [updatedTitle, setUpdatedTitle] = useState("");
    const [updatedDesc, setUpdatedDesc] = useState("");
    const [updatedCategory, setUpdatedCategory] = useState("");
    const [updatedSmSize, setUpdatedSmSize] = useState("");
    const [updatedSmPrice, setUpdatedSmPrice] = useState("");
    const [updatedMedSize, setUpdatedMedSize] = useState("");
    const [updatedMedPrice, setUpdatedMedPrice] = useState("");
    const [updatedLgSize, setUpdatedLgSize] = useState("");
    const [updatedLgPrice, setUpdatedLgPrice] = useState("");
    const [updatedImgFile, setUpdatedImgFile] = useState(null);
    const [imgPreview, setImgPreview] = useState("");
    const [updatedAltText, setUpdatedAltText] = useState("");

    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetch(`/api/products/${productId}`)
            .then((response) => response.json())
            .then((data) => {
                setUpdatedTitle(data.title);
                setUpdatedDesc(data.description);
                setUpdatedCategory(data.category);
                setUpdatedSmSize(data.productExtraInfo[0].size);
                setUpdatedSmPrice(data.productExtraInfo[0].price);
                setUpdatedMedSize(data.productExtraInfo[1].size);
                setUpdatedMedPrice(data.productExtraInfo[1].price);
                setUpdatedLgSize(data.productExtraInfo[2].size);
                setUpdatedLgPrice(data.productExtraInfo[2].price);
                // setUpdatedImgFile(data.publicId);
                setUpdatedAltText(data.altText);
            });
    }, [productId]);

    // Img Preview useEffect logic
    useEffect(() => {
        if (!updatedImgFile) return;

        const objectUrl = URL.createObjectURL(updatedImgFile);
        setImgPreview(objectUrl);

        // Cleanup after
        return () => URL.revokeObjectURL(objectUrl);
    }, [updatedImgFile]);

    function handleTitleChange(event) {
        setUpdatedTitle(event.target.value);
    }

    function handleDescriptionChange(event) {
        setUpdatedDesc(event.target.value);
    }

    function handleSelectChange(event) {
        setUpdatedCategory(event.target.value);
    }

    // Small
    function handleSmallAmtChange(event) {
        setUpdatedSmSize(event.target.value);
    }

    function handleSmallPriceChange(event) {
        setUpdatedSmPrice(event.target.value);
    }

    // Medium
    function handleMediumAmtChange(event) {
        setUpdatedMedSize(event.target.value);
    }

    function handleMediumPriceChange(event) {
        setUpdatedMedPrice(event.target.value);
    }

    // Large
    function handleLargeAmtChange(event) {
        setUpdatedLgSize(event.target.value);
    }

    function handleLargePriceChange(event) {
        setUpdatedLgPrice(event.target.value);
    }

    // Img File
    function handleSelectedFile(event) {
        if (!event.target.files || event.target.files.length === 0) {
            return;
        }

        const selectedImg = event.target.files[0];
        setUpdatedImgFile(selectedImg);
    }

    function handleFileAltTxtChange(event) {
        setUpdatedAltText(event.target.value);
    }

    // Form Submit
    async function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true);
        // Stringify arr to send in formData to server
        const productExtraInfo = JSON.stringify([
            { size: Number(updatedSmSize), price: Number(updatedSmPrice) },
            { size: Number(updatedMedSize), price: Number(updatedMedPrice) },
            { size: Number(updatedLgSize), price: Number(updatedLgPrice) }
        ]);

        let formData = new FormData();
        // formData vals converted to strings or blob (file)
        // Base img data
        formData.append("title", updatedTitle);
        formData.append("description", updatedDesc);
        formData.append("category", updatedCategory);
        // Product size/pricing data
        formData.append("productExtraInfo", productExtraInfo);
        // Img file data
        formData.append("productImg", updatedImgFile);
        formData.append("imgAltText", updatedAltText);

        try {
            const response = await fetch("/api/products", {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });

            // Check for errors
            if (!response.ok) {
                const serverErrMsg = await response.json();

                throw Error(serverErrMsg.error);
            }

            setIsLoading(false);

            const { msg } = await response.json();
            setMsg(msg);

        } catch (err) {
            setIsLoading(false);
            setError(err);
        }
    }

    // JSX elems
    const uploadPreview = updatedImgFile ? <FilePreview selectedImgPreview={imgPreview} selectedImgAltTxt={updatedAltText} /> : null;
    const errorMsg = error ? <ErrorMsg error={error} /> : null;
    const resMessage = msg ? <Message msg={msg} /> : null;
    const loadingSpinner = isLoading ? <LoadingSpinner /> : null;

    return (
        <form onSubmit={handleSubmit} className="update-product__form add-product__form" encType="multipart/form-data">
            <FormSegment>
                <div className="add-product__form__column--left">
                    <NumberBadge>1</NumberBadge>
                    <h2>Product Info</h2>
                </div>
                <div className="add-product__form__column--right">
                    <div className="form-group">
                        <label htmlFor="title" className="form-group__label">Title</label>
                        <input value={updatedTitle} onChange={handleTitleChange} id="title" type="text" className="form-group__input" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description" className="form-group__label">Description</label>
                        <textarea value={updatedDesc} onChange={handleDescriptionChange} id="description" rows="10" className="form-group__textarea" required></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="category" className="form-group__label">Category</label>
                        <select value={updatedCategory} onChange={handleSelectChange} id="category" className="form-group__select" required>
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
                            <input value={updatedSmSize} onChange={handleSmallAmtChange} id="size-small-amt" type="number" className="form-group__input" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="size-small-price" className="form-group__label">Price</label>
                            <input value={updatedSmPrice} onChange={handleSmallPriceChange} id="size-small-price" type="number" className="form-group__input" required />
                        </div>
                    </div>
                    <div className="add-product__form__sizes-group">
                        <h3 className="add-product__form__sub-heading">Size Medium</h3>
                        <div className="form-group">
                            <label htmlFor="size-medium-amt" className="form-group__label">Gallon Amount</label>
                            <input value={updatedMedSize} onChange={handleMediumAmtChange} id="size-medium-amt" type="number" className="form-group__input" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="size-medium-price" className="form-group__label">Price</label>
                            <input value={updatedMedPrice} onChange={handleMediumPriceChange} id="size-medium-price" type="number" className="form-group__input" required />
                        </div>
                    </div>
                    <div className="add-product__form__sizes-group">
                        <h3 className="add-product__form__sub-heading">Size Large</h3>
                        <div className="form-group">
                            <label htmlFor="size-large-amt" className="form-group__label">Gallon Amount</label>
                            <input value={updatedLgSize} onChange={handleLargeAmtChange} id="size-large-amt" type="number" className="form-group__input" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="size-large-price" className="form-group__label">Price</label>
                            <input value={updatedLgPrice} onChange={handleLargePriceChange} id="size-large-price" type="number" className="form-group__input" required />
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
                        <label htmlFor="img-file" className="form-group__label">Select Image File (Old image will be retained, unless a new image is selected.)</label>
                        <input onChange={handleSelectedFile} type="file" id="img-file" className="add-product__form__file-input" />
                        {uploadPreview}
                    </div>
                    <div className="form-group">
                        <label htmlFor="img-alt-txt" className="form-group__label">Image Alt Text</label>
                        <textarea value={updatedAltText} onChange={handleFileAltTxtChange} id="img-alt-txt" rows="3" className="form-group__textarea" required></textarea>
                    </div>
                </div>
            </FormSegment>
            {errorMsg}
            {loadingSpinner}
            {resMessage}
            <button type="submit" className="add-product__form__submit-btn">Submit</button>
        </form>
    );
}

export default UpdateProductForm;
