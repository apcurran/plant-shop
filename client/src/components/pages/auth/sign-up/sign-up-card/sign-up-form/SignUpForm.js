import { useState, useEffect } from "react";

import "../../../AuthForm.css";

function SignUpForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <form className="auth-card__content__form sign-up__card__content__form">
            <div className="auth-card__content__form-group sign-up__card__content__form-group">
                <label htmlFor="first-name" className="auth-card__content__form__label sign-up__card__content__form__label">First Name</label>
                <input onChange={(event) => setFirstName(event.target.value)} type="text" name="first-name" id="first-name" className="auth-card__content__form__input sign-up__content__form__input" required />
            </div>
            <div className="sign-up__card__content__form-group">
                <label htmlFor="last-name" className="auth-card__content__form__label sign-up__card__content__form__label">Last Name</label>
                <input onChange={(event) => setLastName(event.target.value)} type="text" name="last-name" id="last-name" className="auth-card__content__form__input sign-up__content__form__input" required />
            </div>
            <div className="sign-up__card__content__form-group">
                <label htmlFor="email" className="auth-card__content__form__label sign-up__card__content__form__label">Email</label>
                <input onChange={(event) => setEmail(event.target.value)} type="email" name="email" id="email" className="auth-card__content__form__input sign-up__content__form__input" required />
            </div>
            <div className="sign-up__card__content__form-group">
                <label htmlFor="password" className="auth-card__content__form__label sign-up__card__content__form__label">Password</label>
                <input onChange={(event) => setPassword(event.target.value)} type="password" name="password" id="password" className="auth-card__content__form__input sign-up__content__form__input" required />
            </div>
            <button className="auth-card__content__form__submit-btn sign-up__card__content__submit-btn">Submit</button>
        </form>
    );
}

export default SignUpForm;
