import "./TitleBar.css";

function TitleBar({ children }) {
    return (
        <h1 className="title-bar">{children}</h1>
    );
}

export default TitleBar;
