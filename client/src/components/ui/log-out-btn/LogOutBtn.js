import "./LogOutBtn.css";

function LogOutBtn({ handleLogOut }) {
    return (
        <button onClick={handleLogOut} className="nav__link log-out-btn">Log Out</button>
    );
}

export default LogOutBtn;
