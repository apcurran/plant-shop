import "./ErrorMsg.css";

function ErrorMsg({ error }) {
    return (
        <p className="error-msg">{error}</p>
    );
}

export default ErrorMsg;
