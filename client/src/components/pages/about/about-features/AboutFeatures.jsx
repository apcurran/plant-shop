import { AdvancedImage, AdvancedVideo } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";

import { cld } from "@utils/cloudinary-setup";

import "./AboutFeatures.css";

function AboutFeatures() {
    const livingRoomPlantsImg = cld
        .image("evergreen-app/living-room-table-plants_dv16lm.jpg")
        .resize(fill().width(600))
        .format("auto")
        .quality("auto");

    const pearsImg = cld
        .image("evergreen-app/three-pears_pvexbh.jpg")
        .resize(fill().width(600))
        .format("auto")
        .quality("auto");

    const leavesImg = cld
        .image("evergreen-app/light-through-leaves_sllhnh.jpg")
        .resize(fill().width(1300).height(600))
        .format("auto")
        .quality("auto");

    const windVideo = cld
        .video("evergreen-app/potted-plant-blowing-in-wind_gb7lya")
        .resize(fill().width(1300).height(600))
        .format("auto")
        .quality("auto");

    return (
        <section className="about__features">
            <figure className="about__features__fig">
                <AdvancedImage
                    cldImg={livingRoomPlantsImg}
                    className="about__features__fig__img"
                    width="1920"
                    height="1440"
                    loading="lazy"
                />
            </figure>
            <article className="about__features__article">
                <h2 className="about__features__article__title">
                    Plants for Your Life
                </h2>
                <p className="about__features__article__desc">
                    Aenean eget elit nisl. Maecenas ac semper sapien. Vestibulum
                    orci orci, luctus vel est sit amet, gravida ullamcorper sem.
                    Nullam lobortis scelerisque pulvinar. Aliquam id libero quis
                    quam ultrices suscipit quis vitae ligula. Etiam gravida
                    porta ultricies. Sed elementum venenatis felis, ut elementum
                    leo eleifend non. Aliquam sem tortor, egestas consectetur
                    urna vel, molestie dapibus sem.
                </p>
            </article>
            <div className="about__features__video-container">
                <AdvancedVideo
                    cldVid={windVideo}
                    className="about__features__video"
                    width="1920"
                    height="1080"
                    loop={true}
                    autoPlay={true}
                    muted={true}
                />
            </div>
            <article className="about__features__article">
                <h2 className="about__features__article__title">
                    Food From Your Backyard
                </h2>
                <p className="about__features__article__desc">
                    Quisque semper condimentum ex, at luctus sem gravida et.
                    Aliquam sodales sem eu nibh iaculis aliquet. Sed nibh erat,
                    pellentesque malesuada interdum tempor, aliquet nec arcu. In
                    vel venenatis ante. Suspendisse non pellentesque nulla.
                    Etiam congue sed mauris vel molestie.
                </p>
            </article>
            <figure className="about__features__fig about__features__fig--right">
                <AdvancedImage
                    cldImg={pearsImg}
                    className="about__features__fig__img"
                    width="1920"
                    height="1228"
                    loading="lazy"
                />
            </figure>
            <figure className="about__features__fig about__features__fig--span-all">
                <AdvancedImage
                    cldImg={leavesImg}
                    className="about__features__fig__img"
                    width="1920"
                    height="1282"
                    loading="lazy"
                />
            </figure>
        </section>
    );
}

export default AboutFeatures;
