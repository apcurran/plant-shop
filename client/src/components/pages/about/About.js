import "./About.css";
import Header from "../../layout/header/Header";
import AboutHero from "./about-hero/AboutHero";

function About() {
    return (
        <div className="about">
            <div className="about-grid-wrapper">
                <Header />
                <AboutHero />
            </div>
        </div>
    );
}

export default About;
