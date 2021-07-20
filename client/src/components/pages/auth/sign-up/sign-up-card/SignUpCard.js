import { useState, useEffect } from "react";

import "../../AuthForm.css";
import "./SignUpCard.css";
import AuthImg from "../../auth-img/AuthImg";

function SignUpCard() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="auth-card sign-up__card">
            <section className="auth-card__content sign-up__card__content">
                <h1 className="auth-card__content__title sign-up__card__content__title">Sign Up</h1>
                <form className="auth-card__content__form sign-up__card__content__form">
                    <div className="auth-card__content__form-group sign-up__card__content__form-group">
                        <label htmlFor="first-name" className="auth-card__content__form__label sign-up__card__content__form__label">First Name</label>
                        <input type="text" name="first-name" id="first-name" className="auth-card__content__form__input sign-up__content__form__input" required />
                    </div>
                    <div className="sign-up__card__content__form-group">
                        <label htmlFor="last-name" className="auth-card__content__form__label sign-up__card__content__form__label">Last Name</label>
                        <input type="text" name="last-name" id="last-name" className="auth-card__content__form__input sign-up__content__form__input" required />
                    </div>
                    <div className="sign-up__card__content__form-group">
                        <label htmlFor="email" className="auth-card__content__form__label sign-up__card__content__form__label">Email</label>
                        <input type="email" name="email" id="email" className="auth-card__content__form__input sign-up__content__form__input" required />
                    </div>
                    <div className="sign-up__card__content__form-group">
                        <label htmlFor="password" className="auth-card__content__form__label sign-up__card__content__form__label">Password</label>
                        <input type="password" name="password" id="password" className="auth-card__content__form__input sign-up__content__form__input" required />
                    </div>
                    <button className="auth-card__content__form__submit-btn sign-up__card__content__submit-btn">Submit</button>
                </form>
            </section>
            <figure className="auth-card__fig sign-up__card__fig">
                <AuthImg imgPublicId="evergreen-app/sign-up/sign-up-bg_a3cud7.jpg" imgWidth="1920" imgHeight="1280" />
            </figure>
        </div>
    );
}

export default SignUpCard;
