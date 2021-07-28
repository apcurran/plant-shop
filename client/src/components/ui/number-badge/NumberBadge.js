import "./NumberBadge.css";

function NumberBadge({ children }) {
    return (
        <div className="number-badge">
            <small className="number-badge__num">{children}</small>
        </div>
    );
}

export default NumberBadge;
