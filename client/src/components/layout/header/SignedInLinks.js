import { useHistory } from "react-router-dom";

function SignedInLinks({ setToken, setUser, userInfo }) {
    const history = useHistory();

    function handleLogOut() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userInfo");

        // Reset store state
        setToken("");
        setUser({});

        history.push("/");
    }

    return (
        <ul className="nav__links-list nav__links-list--auth">
            <span>Hello, {userInfo.firstName}!</span>
            <li className="nav__item">
                <button onClick={handleLogOut} className="nav__link">Log Out</button>
            </li>
        </ul>
    );
}

export default SignedInLinks;
