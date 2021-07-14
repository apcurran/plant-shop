import "./ProductSizeBtn.css";

function ProductSizeBtn({ prodSizeGallons, prodSizePrice }) {
    return (
        <button className="product__content__size-btn">
            <div className="product__content__size-btn__gallon-size">{prodSizeGallons} gallon</div>
            <span className="product__content__size-btn__price">${prodSizePrice}</span>
        </button>
    );
}

export default ProductSizeBtn;
