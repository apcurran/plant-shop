import "./PlantTypes.css";

function PlantTypes() {
    return (
        <section className="home__plant-types">
            <div className="home__plant-types-inner-wrapper">
                <div className="home__plant-types__column--left">
                    <h2 className="home__plant-types__title">Plants for Sale</h2>
                    <h3 className="home__plant-types__sub-heading">From indoors to outdoors, we have the right plants to suit your needs.</h3>
                    <ul className="home__plant-types__list">
                        <li className="home__plant-types__item">House plants</li>
                        <li className="home__plant-types__item">Fruit trees</li>
                        <li className="home__plant-types__item">Shade trees</li>
                        <li className="home__plant-types__item">Special order plants</li>
                    </ul>
                </div>
                <div className="home__plant-types__column--right">
                    <p className="home__plant-types__desc">
                        Vestibulum sed commodo nunc, eget suscipit nulla. Quisque porta enim et urna pharetra molestie. Aliquam imperdiet nunc porttitor finibus ultrices. Suspendisse commodo faucibus bibendum. Fusce tincidunt id eros nec aliquet. Quisque in urna ac turpis cursus dictum. Nulla felis diam, posuere et ante a, vulputate tincidunt libero.
                    </p>
                    <p className="home__plant-types__desc">
                        Quisque vehicula, elit quis tristique placerat, justo tortor fermentum orci, eu accumsan nulla enim sed urna. Donec sagittis rutrum leo. Nulla facilisi. Ut mattis tellus ac orci efficitur fermentum.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default PlantTypes;
