import "./Home.css";
import Header from "../../layout/header/Header";
import HeroSection from "./hero-section/HeroSection";
import CollectionCards from "./collection-cards/CollectionCards";

function Home() {
    return (
        <div className="home">
            <div className="home-grid-wrapper">
                <Header homePageRendering="true" />
                <HeroSection />
            </div>
            <CollectionCards />
        </div>
    );
}

export default Home;
