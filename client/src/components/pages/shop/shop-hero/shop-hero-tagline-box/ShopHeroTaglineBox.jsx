import "./ShopHeroTaglineBox.css";

function ShopHeroTaglineBox({ titleText }) {
    return (
        <div className="shop__hero__tagline">
            <h2 className="shop__hero__tagline__title">{titleText}</h2>
        </div>
    );
}

export default ShopHeroTaglineBox;
