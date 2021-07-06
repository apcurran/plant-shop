import { Link } from "react-router-dom";

function CollectionCard({ title, desc, linkHref }) {
    return (
        <section className="home__collection-card">
            <div className="home__collection-card__inner-container">
                <figure className="home__collection-card__fig">
                    <img src="" alt="" className="home__collection-card__fig__img" />
                </figure>
                <article className="home__collection-card__article">
                    <Link to={linkHref}>
                        <button className="home__collection-card__article__badge">Collection</button>
                    </Link>
                    <h1 className="home__collection-card__article__title">{title}</h1>
                    <p className="home__collection-card__article__desc">{desc}</p>
                    <Link to={linkHref}>
                        <button className="home__collection-card__article__cta-btn">Shop Now</button>
                    </Link>
                </article>
            </div>
        </section>
    );
}

export default CollectionCard;
