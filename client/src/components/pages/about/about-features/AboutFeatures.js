import { Image, Transformation } from "cloudinary-react";

import "./AboutFeatures.css";

function AboutFeatures() {
    return (
        <section className="about__features">
            <figure className="about__features__fig">
                <Image className="about__features__fig__img" publicId="evergreen-app/living-room-table-plants_dv16lm.jpg" loading="lazy">
                    <Transformation />
                </Image>
            </figure>
            <article className="about__features__article">
                <h2 className="about__features__article__title">Plants for Your Life</h2>
                <p className="about__features__article__desc">
                    Aenean eget elit nisl. Maecenas ac semper sapien. Vestibulum orci orci, luctus vel est sit amet, gravida ullamcorper sem. Nullam lobortis scelerisque pulvinar. Aliquam id libero quis quam ultrices suscipit quis vitae ligula. Etiam gravida porta ultricies. Sed elementum venenatis felis, ut elementum leo eleifend non. Aliquam sem tortor, egestas consectetur urna vel, molestie dapibus sem.
                </p>
            </article>
        </section>
    );
}

export default AboutFeatures;
