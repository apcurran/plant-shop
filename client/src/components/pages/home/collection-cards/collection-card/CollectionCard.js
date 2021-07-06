function CollectionCard() {
    return (
        <section className="home__collection-card">
            <div className="home__collection-card__inner-container">
                <figure className="home__collection-card__fig">
                    <img src="" alt="" className="home__collection-card__fig__img" />
                </figure>
                <article className="home__collection-card__article">
                    <button className="home__collection-card__article__badge">Collection</button>
                    <h1 className="home__collection-card__article__title"></h1>
                    <p className="home__collection-card__article__desc"></p>
                    <button className="home__collection-card__article__cta-btn"></button>
                </article>
            </div>
        </section>
    );
}

export default CollectionCard;
