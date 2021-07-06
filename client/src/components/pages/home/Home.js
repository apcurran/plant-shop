import "./Home.css";
import Header from "../../layout/header/Header";
import HeroSection from "./hero-section/HeroSection";

function Home() {
    return (
        <div className="home">
            <div className="home-grid-wrapper">
                <Header homePageRendering="true" />
                <HeroSection />
            </div>
        </div>
    );
}

export default Home;
