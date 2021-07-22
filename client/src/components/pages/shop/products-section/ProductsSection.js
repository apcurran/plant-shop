import "./ProductsSection.css";
import ProductCard from "./product-card/ProductCard";

function ProductsSection({ productsData, deleteProductHandler, isAdmin, adminToken }) {
    return (
        <section className="shop__products-section">
            <h2 className="shop__products-section__title">Our Stock</h2>
            <div className="shop__products-section__product-card-grid-wrapper">
                {productsData.map((productData) => (
                    <ProductCard key={productData.productId} productData={productData} deleteProductHandler={deleteProductHandler} isAdmin={isAdmin} adminToken={adminToken} />
                ))}
            </div>
        </section>
    );
}

export default ProductsSection;
