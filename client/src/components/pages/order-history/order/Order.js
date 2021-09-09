import "./Order.css";

import OrderDescriptor from "../order-descriptor/OrderDescriptor";
import OrderItem from "../order-item/OrderItem";

// Utils
import { formatDate } from "../../../../utils/format-date";

function Order({ orderData }) {
    const formattedDate = formatDate(orderData.createdAt);
    const lastFourOrderChars = (orderData.stripePaymentId).slice(-4);
    const orderItems = orderData.orderItems.map((orderItem) => {
        return <OrderItem key={orderItem.productExtraInfoId} />; 
    });

    return (
        <section className="order">
            <div className="order__descriptor-group">
                <OrderDescriptor heading="Order Placed" dataSegment={formattedDate} />
                <OrderDescriptor heading="Total" dataSegment={`$${orderData.totalCost}`} />
                <OrderDescriptor heading="Order #" dataSegment={lastFourOrderChars} />
            </div>
            {orderItems}
        </section>
    );
}

export default Order;
