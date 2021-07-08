import { Image, Video, Transformation } from "cloudinary-react";

import "./AboutFeatures.css";

function AboutFeatures() {
    return (
        <section className="about__features">
            <figure className="about__features__fig">
                <Image className="about__features__fig__img" publicId="evergreen-app/living-room-table-plants_dv16lm.jpg" width="1920" height="1440" loading="lazy">
                    <Transformation width="600" crop="fill" quality="auto" fetchFormat="auto" />
                </Image>
            </figure>
            <article className="about__features__article">
                <h2 className="about__features__article__title">Plants for Your Life</h2>
                <p className="about__features__article__desc">
                    Aenean eget elit nisl. Maecenas ac semper sapien. Vestibulum orci orci, luctus vel est sit amet, gravida ullamcorper sem. Nullam lobortis scelerisque pulvinar. Aliquam id libero quis quam ultrices suscipit quis vitae ligula. Etiam gravida porta ultricies. Sed elementum venenatis felis, ut elementum leo eleifend non. Aliquam sem tortor, egestas consectetur urna vel, molestie dapibus sem.
                </p>
            </article>
            <div className="about__features__video-container">
                <Video className="about__features__video" publicId="evergreen-app/potted-plant-blowing-in-wind_gb7lya" loop="true" autoplay="true" muted="muted">
                    <Transformation width="1300" height="600" crop="fill" quality="auto" fetchFormat="auto" />
                </Video>
            </div>
            <article className="about__features__article">
                <h2 className="about__features__article__title">Food From Your Backyard</h2>
                <p className="about__features__article__desc">
                    Quisque semper condimentum ex, at luctus sem gravida et. Aliquam sodales sem eu nibh iaculis aliquet. Sed nibh erat, pellentesque malesuada interdum tempor, aliquet nec arcu. In vel venenatis ante. Suspendisse non pellentesque nulla. Etiam congue sed mauris vel molestie.
                </p>
            </article>
            <figure className="about__features__fig about__features__fig--right">
                <Image className="about__features__fig__img" publicId="evergreen-app/three-pears_pvexbh.jpg" width="1920" height="1228" loading="lazy">
                    <Transformation width="600" crop="fill" quality="auto" fetchFormat="auto" />
                </Image>
            </figure>
            <figure className="about__features__fig about__features__fig--span-all">
                <Image className="about__features__fig__img" publicId="evergreen-app/light-through-leaves_sllhnh.jpg" width="1920" height="1282" loading="lazy">
                    <Transformation width="1300" height="600" crop="fill" quality="auto" fetchFormat="auto" />
                </Image>
            </figure>
        </section>
    );
}

export default AboutFeatures;
