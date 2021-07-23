import "./MainWrapper.css";

function MainWrapper({ children }) {
    return (
        <main className="main-page-wrapper">
            {children}
        </main>
    );
}

export default MainWrapper;
