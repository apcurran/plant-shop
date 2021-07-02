import { NavLink } from "react-router-dom";

function SignedOutLinks() {
    return (
        <ul className="nav__links-list nav__links-list--auth">
            <li className="nav__item">
                <NavLink to="/auth/log-in">Log In</NavLink>
            </li>
            <li className="nav__item">
                <NavLink to="/auth/sign-up">Sign Up</NavLink>
            </li>
        </ul>
    );
}

export default SignedOutLinks;
