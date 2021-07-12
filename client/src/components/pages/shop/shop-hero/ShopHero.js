import "./ShopHero.css";
import ShopHeroFig from "./shop-hero-fig/ShopHeroFig";
import ShopHeroTaglineBox from "./shop-hero-tagline-box/ShopHeroTaglineBox";

function ShopHero({ categoryQueryText }) {
    // Output different images and headline boxes for each collection type
    const housePlantImgs = [
        {
            publicId: "evergreen-app/collections/hero/long-leaves-bg_focsfr.jpg",
            alt: "Plant with long green leaves."
        },
        {
            publicId: "evergreen-app/collections/hero/purple-leaves-bg_kz8iqm.jpg",
            alt: "Bird's eye view of purple leaves."
        },
        {
            publicId: "evergreen-app/collections/hero/green-leaves-bg_owspbi.jpg",
            alt: "Bird's eye view of green leaves with ridges on them."
        },
        {
            publicId: "evergreen-app/collections/hero/cactus-leaves-bg_dqjlmp.jpg",
            alt: "Bird's eye view of flower-shaped purple cactus leaves."
        }
    ];

    const fruitTreeImgs = [
        {
            publicId: "evergreen-app/collections/hero/lemons_yul2l1.jpg",
            alt: "Lemons against a white background."
        },
        {
            publicId: "evergreen-app/collections/hero/olive-trees_uwcrgn.jpg",
            alt: "Olives hanging on an olive tree."
        },
        {
            publicId: "evergreen-app/collections/hero/orange-trees_ry3dpn.jpg",
            alt: "Orange trees in front of a building."
        },
        {
            publicId: "evergreen-app/collections/hero/apple-tree_iwhshg.jpg",
            alt: "Red apples on an apple tree."
        }
    ];

    const shadeTreeImgs = [
        {
            publicId: "evergreen-app/collections/hero/redwood-trees_gxtzl3.jpg",
            alt: "Upward angle view of tall redwood trees."
        },
        {
            publicId: "evergreen-app/collections/hero/fall-trees_mrofdl.jpg",
            alt: "Orange and yellow fall leaves on trees near a path."
        },
        {
            publicId: "evergreen-app/collections/hero/winter-trees_t98fgj.jpg",
            alt: "Person walking down a forest trail with snow."
        },
        {
            publicId: "evergreen-app/collections/hero/spring-trees_ukk4e0.jpg",
            alt: "Pink blossoms on a tree during spring."
        }
    ];

    const allCollectionsImgs = [
        housePlantImgs.slice(0, 1),
        fruitTreeImgs.slice(0, 1),
        shadeTreeImgs.slice(0, 2)
    ].flat();

    let outputTagline;
    let outputImgs;

    if (categoryQueryText === "house plants") {
        // Unique category hero imgs
        outputImgs = housePlantImgs.map((img) => {
            return (
                <ShopHeroFig key={img.publicId} img={img} />
            );
        });
        // Unique category tagline box
        outputTagline = <ShopHeroTaglineBox titleText="Bring Nature Indoors" />
    } else if (categoryQueryText === "fruit trees") {
        outputImgs = fruitTreeImgs.map((img) => {
            return (
                <ShopHeroFig key={img.publicId} img={img} />
            );
        });

        outputTagline = <ShopHeroTaglineBox titleText="Food From Your Backyard" />
    } else if (categoryQueryText === "shade trees") {
        outputImgs = shadeTreeImgs.map((img) => {
            return (
                <ShopHeroFig key={img.publicId} img={img} />
            );
        });

        outputTagline = <ShopHeroTaglineBox titleText="Create Your own Oasis" />
    } else {
        outputImgs = allCollectionsImgs.map((img) => {
            return (
                <ShopHeroFig key={img.publicId} img={img} />
            );
        });

        outputTagline = <ShopHeroTaglineBox titleText="Evergreen Plants for Your Home" />
    }

    return (
        <div className="shop__hero">
            {outputImgs}
            {outputTagline}
        </div>
    );
}

export default ShopHero;
