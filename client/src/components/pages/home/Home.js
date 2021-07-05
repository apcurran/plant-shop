import "./Home.css";

function Home() {
    return (
        <section className="home-hero__section">
            <div className="home-hero__section__inner-container">
                <h1 className="home-hero__title">
                    <span className="home-hero__title__span">Bring nature</span>
                    <span className="home-hero__title__span">to you.</span>
                </h1>
                <svg className="arrow-icon--down" width="24" height="84" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.94 83.06a1.5 1.5 0 002.12 0l9.547-9.545a1.5 1.5 0 10-2.122-2.122L12 79.88l-8.485-8.486a1.5 1.5 0 10-2.122 2.122l9.546 9.546zM10.5 0v82h3V0h-3z" fill="#292524" /></svg>
            </div>
        </section>
    );
}

export default Home;
