import { useHistory, NavLink } from "react-router-dom";

import LogOutBtn from "../../ui/log-out-btn/LogOutBtn";

function SignedInLinks({ setToken, setUser, setIsAdmin, userInfo }) {
    const history = useHistory();

    function handleLogOut() {
        sessionStorage.clear();

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
            <NavLink to="/orders" className="nav__links-list__link">Your Orders</NavLink>
        </ul>
    );
}

export default SignedInLinks;
