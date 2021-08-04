import { useHistory } from "react-router-dom";

import LogOutBtn from "../../ui/log-out-btn/LogOutBtn";

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
                {<LogOutBtn handleLogOut={handleLogOut} />}
            </li>
        </ul>
    );
}

export default SignedInLinks;
