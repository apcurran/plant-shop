import CollectionCard from "./collection-card/CollectionCard";

function CollectionCards() {
    const collectionCardsData = [
        {
            title: "Organic Fruit for your Home Garden",
            desc: "Nulla euismod justo sapien, cursus malesuada lorem efficitur ut. Sed nec dapibus ligula, ut luctus diam. Nunc est libero, sagittis fermentum felis vitae, fermentum volutpat neque. Vestibulum venenatis vel lorem a consequat. Praesent nec tellus metus. Aliquam consequat quis libero vitae euismod. Aliquam ac sem nec arcu facilisis imperdiet vitae et purus. Proin ut ornare nibh, in tincidunt enim.",
            linkHref: "/collections/fruit"
        },
        {
            title: "House Plants",
            desc: "Suspendisse potenti. Donec sed suscipit risus. Sed vitae vulputate nibh, ac pretium sem. Proin id diam ut neque pharetra aliquet. Morbi volutpat quis justo id faucibus. Vestibulum tempor nulla nec est pellentesque aliquet. Quisque eleifend libero mauris, sed porta neque tempor consequat. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
            linkHref: "/collections/house-plants"
        },
        {
            title: "Outdoor Shade Trees",
            desc: "Suspendisse potenti. Sed urna eros, facilisis id lacus a, mollis fringilla dolor. Donec pulvinar tristique gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Fusce odio ipsum, feugiat nec felis non, condimentum fringilla nulla. Curabitur et ipsum aliquet, fringilla mi non, vehicula nisi. Aliquam ultrices elit eu scelerisque bibendum. Sed et dolor et velit malesuada molestie accumsan vel elit.",
            linkHref: "/collections/shade-trees"
        }
    ];

    return (
        <div className="home__collection-cards-container">
            <CollectionCard />
            <CollectionCard />
            <CollectionCard />
        </div>
    );
}

export default CollectionCards;
