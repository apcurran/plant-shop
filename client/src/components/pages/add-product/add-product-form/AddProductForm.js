import FormSegment from "../../../ui/form-segment/FormSegment";
import NumberBadge from "../../../ui/number-badge/NumberBadge";

function AddProductForm() {
    return (
        <form className="add-product__form">
            <FormSegment>
                <NumberBadge>1</NumberBadge>
                <h2>Hi</h2>
            </FormSegment>
            <FormSegment>
                <h2>Hi</h2>
            </FormSegment>
            <FormSegment>
                <h2>Hi</h2>
            </FormSegment>
        </form>
    );
}

export default AddProductForm;
