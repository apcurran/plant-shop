import { Link } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";

import "./CollectionCard.css";

function CollectionCard({ title, desc, linkHref, imgPublicId, imgAlt, imgWidth, imgHeight }) {
    return (
        <section className="home__collection-card">
            <div className="home__collection-card__inner-container">
                <figure className="home__collection-card__fig">
                    <Image publicId={imgPublicId} alt={imgAlt} className="home__collection-card__fig__img" loading="lazy" width={imgWidth} height={imgHeight}>
                        <Transformation quality="auto" fetchFormat="auto" />
                    </Image>
                </figure>
                <article className="home__collection-card__article">
                    <Link to={linkHref}>
                        <button className="home__collection-card__article__badge">Collection</button>
                    </Link>
                    <h1 className="home__collection-card__article__title">{title}</h1>
                    <p className="home__collection-card__article__desc">{desc}</p>
                    <Link to={linkHref} className="home__collection-card__article__cta-btn-link-wrapper">
                        <button className="home__collection-card__article__cta-btn">
                            <span>Shop Now</span>
                            <svg width="21" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.707 8.707a1 1 0 000-1.414L14.343.929a1 1 0 10-1.414 1.414L18.586 8l-5.657 5.657a1 1 0 001.414 1.414l6.364-6.364zM0 9h20V7H0v2z" fill="#047857" /></svg>
                        </button>
                    </Link>
                </article>
            </div>
        </section>
    );
}

export default CollectionCard;
