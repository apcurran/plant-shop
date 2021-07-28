import "./AddProductForm.css";
import FormSegment from "../../../ui/form-segment/FormSegment";
import NumberBadge from "../../../ui/number-badge/NumberBadge";

function AddProductForm() {
    return (
        <form className="add-product__form">
            <FormSegment>
                <div className="add-product__form__column--left">
                    <NumberBadge>1</NumberBadge>
                    <h2>Hi</h2>
                </div>
                <div className="add-product__form__column--right">
                    <h3>Title</h3>
                </div>
            </FormSegment>
            <FormSegment>
                <div className="add-product__form__column--left">
                    <NumberBadge>2</NumberBadge>
                    <h2>Hi</h2>
                </div>
                <div className="add-product__form__column--right">
                    <h3>Title</h3>
                </div>
            </FormSegment>
            <FormSegment>
                <div className="add-product__form__column--left">
                    <NumberBadge>3</NumberBadge>
                    <h2>Hi</h2>
                </div>
                <div className="add-product__form__column--right">
                    <h3>Title</h3>
                </div>
            </FormSegment>
        </form>
    );
}

export default AddProductForm;
