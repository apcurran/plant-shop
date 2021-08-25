import { useCallback } from "react";
import { Image, Transformation } from "cloudinary-react";

import useCartStore from "../../../../stores/CartStore";

import "./CartTable.css";
import CheckoutBtn from "../../../ui/checkout-btn/CheckoutBtn";

function CartTable({ items }) {
    const incrementOneItem = useCartStore(useCallback((state) => state.incrementOneItem, []));
    const decrementOneItem = useCartStore(useCallback((state) => state.decrementOneItem, []));
    const removeItemFromCart = useCartStore(useCallback((state) => state.removeItemFromCart, []));

    const itemsSubTotal = items.reduce((total, currVal) => total + currVal.itemTotalPrice, 0);

    const itemsArr = items.map(item => (
        <tr key={item.productExtraInfoId} className="cart-table__tbody__tr">
            <td className="cart-table__tbody__tr__td cart-table__prod-info">
                <figure className="cart-table__prod-info__fig">
                    <Image publicId={item.imgPublicId} width="125" height="150" alt={item.imgAltTxt} className="cart-table__prod-info__fig__img">
                        <Transformation width="125" height="150" crop="fill" quality="auto" fetchFormat="auto" />
                    </Image>
                </figure>
                <div className="cart-table__prod-info__desc-container">
                    <h2 className="cart-table__prod-info__title">{item.title}</h2>
                    <p className="cart-table__prod-info__size">{item.size} Gallon</p>
                </div>
            </td>
            <td className="cart-table__tbody__tr__td cart-table__price">${item.price}</td>
            <td className="cart-table__tbody__tr__td cart-table__qty-container">
                <button onClick={() => decrementOneItem(item)} className="cart-table__qty-container__btn">-</button>
                <span>{item.itemQuantity}</span>
                <button onClick={() => incrementOneItem(item)} className="cart-table__qty-container__btn">+</button>
            </td>
            <td className="cart-table__tbody__tr__td cart-table__total">${item.itemTotalPrice}</td>
            <td className="cart-table__tbody__tr__td">
                <button onClick={() => removeItemFromCart(item.productId, item.productExtraInfoId)} aria-label="Close" className="cart-table__tbody__tr__td__close-btn">
                    <svg className="x-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </td>
        </tr>
    ));

    const totalInfo = (
        <section className="total-info">
            <div className="total-info__group">
                <span className="total-info__group__span">Subtotal:</span>
                <span className="total-info__group__span-val">${itemsSubTotal}</span>
                <span className="total-info__group__span">Shipping:</span>
                <span className="total-info__group__span-val">Free</span>
                <span className="total-info__group__span total-info__group__span--total">Total:</span>
                <span className="total-info__group__span-val total-info__group__span-val--total">${itemsSubTotal}</span>
                <CheckoutBtn />
            </div>
        </section>
    );

    return (
        <div className="shopping-cart-info-wrapper">
            <table className="cart-table">
                <thead className="cart-table__thead">
                    <tr className="cart-table__thead__tr">
                        <th className="cart-table__thead__tr__th cart-table__thead__product">Product</th>
                        <th className="cart-table__thead__tr__th">Price</th>
                        <th className="cart-table__thead__tr__th">Quantity</th>
                        <th className="cart-table__thead__tr__th">Total</th>
                    </tr>
                </thead>
                <tbody className="cart-table__tbody">
                    {itemsArr}
                </tbody>
            </table>
            {totalInfo}
        </div>
    );
}

export default CartTable;
