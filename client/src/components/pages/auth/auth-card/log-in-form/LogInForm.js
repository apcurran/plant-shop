import { useState } from "react";
import { useHistory } from "react-router-dom";

import "../AuthForm.css";
import ErrorMsg from "../../../../ui/error-msg/ErrorMsg";

import useAuthStore from "../../../../../stores/AuthStore";

function LogInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    let history = useHistory();

    // AuthStore funcs
    const setToken = useAuthStore((state) => state.setToken);
    const setUser = useAuthStore((state) => state.setUser);
    
    async function handleSubmit(event) {
        event.preventDefault();

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

            // TODO: Store user log in info
            const { accessToken, userInfo } = await response.json();

            setToken(accessToken);
            setUser(userInfo);
            // Re-direct user
            history.push("/collections");

        } catch (err) {
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
            {error ? <ErrorMsg msg={error} /> : null}
        </form>
    );
}

export default LogInForm;
