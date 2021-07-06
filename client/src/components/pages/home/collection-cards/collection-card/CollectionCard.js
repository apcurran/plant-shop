import { Link } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";

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
                    <Link to={linkHref}>
                        <button className="home__collection-card__article__cta-btn">Shop Now</button>
                    </Link>
                </article>
            </div>
        </section>
    );
}

export default CollectionCard;
