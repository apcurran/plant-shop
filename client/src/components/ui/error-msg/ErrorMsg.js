import "./ErrorMsg.css";

function ErrorMsg({ msg }) {
    return (
        <p className="error-msg">{msg}</p>
    );
}

export default ErrorMsg;
