import "./About.css";
import Header from "../../layout/header/Header";
import AboutHero from "./about-hero/AboutHero";
import AboutMission from "./about-mission/AboutMission";
import Footer from "../../layout/footer/Footer";

function About() {
    return (
        <div className="about">
            <div className="about-grid-wrapper">
                <Header />
                <AboutHero />
            </div>
            <AboutMission />
            <Footer />
        </div>
    );
}

export default About;
