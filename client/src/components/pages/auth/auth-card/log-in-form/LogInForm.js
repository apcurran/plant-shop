import { useState } from "react";
import { useHistory, Link } from "react-router-dom";

import "../AuthForm.css";
import ErrorMsg from "../../../../ui/error-msg/ErrorMsg";

import useAuthStore from "../../../../../stores/AuthStore";
import LoadingSpinner from "../../../../ui/loading-spinner/LoadingSpinner";

function LogInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    let history = useHistory();

    // AuthStore funcs
    const setToken = useAuthStore((state) => state.setToken);
    const setUser = useAuthStore((state) => state.setUser);
    const setIsAdmin = useAuthStore((state) => state.setIsAdmin);
    
    async function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true);

        try {
            const response = await fetch("/api/auth/log-in", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            // Check for errors
            if (!response.ok) {
                const serverErrMsg = await response.json();

                throw Error(serverErrMsg.error);
            }

            const { accessToken, userInfo } = await response.json();
            const isAdminVal = userInfo.isAdmin;

            // Save token and user
            sessionStorage.setItem("accessToken", accessToken);
            sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
            sessionStorage.setItem("isAdmin", isAdminVal);
            // Update auth store state
            setToken(accessToken);
            setUser(userInfo);
            setIsAdmin(isAdminVal);

            setIsLoading(false);

            // Re-direct user
            history.push("/collections");

        } catch (err) {
            setIsLoading(false);
            setError(err.message);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="auth-card__content__form">
            <div className="auth-card__content__form-group">
                <label htmlFor="email" className="auth-card__content__form__label">Email</label>
                <input onChange={(event) => setEmail(event.target.value)} type="email" name="email" id="email" className="auth-card__content__form__input" required />
            </div>
            <div className="auth-card__content__form-group">
                <label htmlFor="password" className="auth-card__content__form__label">Password</label>
                <input onChange={(event) => setPassword(event.target.value)} type="password" name="password" id="password" className="auth-card__content__form__input" min="6" max="50" required />
            </div>
            <button className="auth-card__content__form__submit-btn">Submit</button>
            <Link to="/auth/forgot-password" className="auth-card__content__form__link">Reset my password</Link>
            {isLoading ? <LoadingSpinner /> : null}
            {error ? <ErrorMsg error={error} /> : null}
        </form>
    );
}

export default LogInForm;
