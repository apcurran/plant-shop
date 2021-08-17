import "./CartTable.css";

function CartTable() {
    return (
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
                <tr className="cart-table__tbody__tr">
                    <td className="cart-table__tbody__tr__td cart-table__prod-info">
                        <figure className="cart-table__prod-info__fig">
                            img here
                        </figure>
                        <div className="cart-table__prod-info__desc-container">
                            <h2 className="cart-table__prod-info__title">Test Product</h2>
                            <p className="cart-table__prod-info__size">1 Gallon</p>
                        </div>
                    </td>
                    <td className="cart-table__tbody__tr__td cart-table__price">$25</td>
                    <td className="cart-table__tbody__tr__td cart-table__qty-container">
                        <button className="cart-table__qty-container__btn">-</button>
                        <span>2</span>
                        <button className="cart-table__qty-container__btn">+</button>
                    </td>
                    <td className="cart-table__tbody__tr__td cart-table__total">$50</td>
                </tr>
                <tr className="cart-table__tbody__tr">
                    <td className="cart-table__tbody__tr__td cart-table__prod-info">
                        <figure className="cart-table__prod-info__fig">
                            img here
                        </figure>
                        <div className="cart-table__prod-info__desc-container">
                            <h2 className="cart-table__prod-info__title">Test Product 2</h2>
                            <p className="cart-table__prod-info__size">1 Gallon</p>
                        </div>
                    </td>
                    <td className="cart-table__tbody__tr__td cart-table__price">$20</td>
                    <td className="cart-table__tbody__tr__td cart-table__qty-container">
                        <button className="cart-table__qty-container__btn">-</button>
                        <span>1</span>
                        <button className="cart-table__qty-container__btn">+</button>
                    </td>
                    <td className="cart-table__tbody__tr__td cart-table__total">$20</td>
                </tr>
            </tbody>
        </table>
    );
}

export default CartTable;
