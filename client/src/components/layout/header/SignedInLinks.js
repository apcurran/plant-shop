import { useHistory } from "react-router-dom";

function SignedInLinks({ setToken, setUser, setIsAdmin, userInfo }) {
    const history = useHistory();

    function handleLogOut() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userInfo");
        localStorage.removeItem("isAdmin");

        // Reset store state
        setToken("");
        setUser({});
        setIsAdmin(false);

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
