import "./OrderDescriptor.css";

function OrderDescriptor({ heading, dataSegment }) {
    return (
        <div className="order__descriptor">
            <h2 className="order__descriptor__heading">{heading}</h2>
            <p className="order__descriptor__data-segment">{dataSegment}</p>
        </div>
    );
}

export default OrderDescriptor;
