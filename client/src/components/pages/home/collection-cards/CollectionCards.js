import CollectionCard from "./collection-card/CollectionCard";

function CollectionCards() {
    const collectionCardsData = [
        {
            title: "Organic Fruit Trees",
            desc: "Nulla euismod justo sapien, cursus malesuada lorem efficitur ut. Sed nec dapibus ligula, ut luctus diam. Nunc est libero, sagittis fermentum felis vitae, fermentum volutpat neque. Vestibulum venenatis vel lorem a consequat. Praesent nec tellus metus. Aliquam consequat quis libero vitae euismod. Aliquam ac sem nec arcu facilisis imperdiet vitae et purus. Proin ut ornare nibh, in tincidunt enim.",
            linkHref: "/collections/fruit-trees",
            imgData: {
                publicId: "evergreen-app/apple-tree_avlhwn.jpg",
                alt: "Ripe, red apple hanging on an apple tree.",
                width: "1199",
                height: "963"
            }
        },
        {
            title: "House Plants",
            desc: "Suspendisse potenti. Donec sed suscipit risus. Sed vitae vulputate nibh, ac pretium sem. Proin id diam ut neque pharetra aliquet. Morbi volutpat quis justo id faucibus. Vestibulum tempor nulla nec est pellentesque aliquet. Quisque eleifend libero mauris, sed porta neque tempor consequat. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
            linkHref: "/collections/house-plants",
            imgData: {
                publicId: "evergreen-app/home-house-plant_jwrlut.jpg",
                alt: "House plant with large, green leaves against a white background.",
                width: "1189",
                height: "1038"
            }
        },
        {
            title: "Outdoor Shade Trees",
            desc: "Suspendisse potenti. Sed urna eros, facilisis id lacus a, mollis fringilla dolor. Donec pulvinar tristique gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Fusce odio ipsum, feugiat nec felis non, condimentum fringilla nulla. Curabitur et ipsum aliquet, fringilla mi non, vehicula nisi. Aliquam ultrices elit eu scelerisque bibendum. Sed et dolor et velit malesuada molestie accumsan vel elit.",
            linkHref: "/collections/shade-trees",
            imgData: {
                publicId: "evergreen-app/shade-tree_d8zwnz.jpg",
                alt: "Large shade tree on a hill.",
                width: "1625",
                height: "1225"
            }
        }
    ];

    return (
        <div className="home__collection-cards-container">
            {collectionCardsData.map((card) => (
                <CollectionCard
                    key={card.title}
                    title={card.title}
                    desc={card.desc}
                    linkHref={card.linkHref}
                    imgPublicId={card.imgData.publicId}
                    imgAlt={card.imgData.alt}
                    imgWidth={card.imgData.width}
                    imgHeight={card.imgData.height}
                />
            ))}
        </div>
    );
}

export default CollectionCards;
