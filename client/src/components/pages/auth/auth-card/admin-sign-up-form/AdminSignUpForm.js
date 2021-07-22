import { useState } from "react";
import { useHistory } from "react-router-dom";

import "../AuthForm.css";
import ErrorMsg from "../../../../ui/error-msg/ErrorMsg";

function AdminSignUpForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [adminPassword, setAdminPassword] = useState("");
    const [error, setError] = useState("");

    let history = useHistory();
    
    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await fetch("/api/auth/sign-up", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password,
                    adminPassword
                })
            });

            // Check for errors
            if (!response.ok) {
                const serverErrMsg = await response.json();

                throw Error(serverErrMsg.error);
            }

            // Re-direct user
            history.push("/admin/auth/log-in");

        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="auth-card__content__form">
            <div className="auth-card__content__form-group">
                <label htmlFor="first-name" className="auth-card__content__form__label">First Name</label>
                <input onChange={(event) => setFirstName(event.target.value)} type="text" name="first-name" id="first-name" className="auth-card__content__form__input" required />
            </div>
            <div className="auth-card__content__form-group">
                <label htmlFor="last-name" className="auth-card__content__form__label">Last Name</label>
                <input onChange={(event) => setLastName(event.target.value)} type="text" name="last-name" id="last-name" className="auth-card__content__form__input" required />
            </div>
            <div className="auth-card__content__form-group">
                <label htmlFor="email" className="auth-card__content__form__label">Email</label>
                <input onChange={(event) => setEmail(event.target.value)} type="email" name="email" id="email" className="auth-card__content__form__input" required />
            </div>
            <div className="auth-card__content__form-group">
                <label htmlFor="password" className="auth-card__content__form__label">Password (6 character minimum)</label>
                <input onChange={(event) => setPassword(event.target.value)} type="password" name="password" id="password" className="auth-card__content__form__input" min="6" max="50" required />
            </div>
            <div className="auth-card__content__form-group">
                <label htmlFor="password" className="auth-card__content__form__label">Admin Code</label>
                <input onChange={(event) => setAdminPassword(event.target.value)} type="password" name="adminPassword" id="admin-password" className="auth-card__content__form__input" min="6" max="50" required />
            </div>
            <button className="auth-card__content__form__submit-btn">Submit</button>
            {error ? <ErrorMsg msg={error} /> : null}
        </form>
    );
}

export default AdminSignUpForm;
