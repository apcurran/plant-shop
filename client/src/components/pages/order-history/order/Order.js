import "./Order.css";

import OrderDescriptor from "../order-descriptor/OrderDescriptor";
import OrderItem from "../order-item/OrderItem";

// Utils
import { formatDate } from "../../../../utils/format-date";

function Order({ orderData }) {
    const formattedDate = formatDate(orderData.createdAt);
    const formattedOrderCost = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(orderData.totalCost);
    const lastFourOrderChars = orderData.stripePaymentId ? (orderData.stripePaymentId).slice(-4) : "Payment not completed";
    const orderItems = orderData.orderItems.map((orderItem) => {
        return (
            <OrderItem
                key={orderItem.productExtraInfoId}
                title={orderItem.title}
                category={orderItem.category}
                price={orderItem.price}
                size={orderItem.size}
                qty={orderItem.productQty}
                publicId={orderItem.publicId}
                altText={orderItem.altText}
                width={orderItem.width}
                height={orderItem.height}
            />
        ); 
    });

    return (
        <section className="order">
            <div className="order__descriptor-group">
                <OrderDescriptor heading="Order Placed" dataSegment={formattedDate} />
                <OrderDescriptor heading="Total" dataSegment={formattedOrderCost} />
                <OrderDescriptor heading="Order #" dataSegment={lastFourOrderChars} />
            </div>
            {orderItems}
        </section>
    );
}

export default Order;
