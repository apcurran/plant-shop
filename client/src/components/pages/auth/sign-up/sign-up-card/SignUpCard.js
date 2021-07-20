import "../../AuthCard.css";
import "./SignUpCard.css";
import SignUpForm from "./sign-up-form/SignUpForm";
import AuthImg from "../../auth-img/AuthImg";

function SignUpCard() {
    return (
        <div className="auth-card sign-up__card">
            <section className="auth-card__content sign-up__card__content">
                <h1 className="auth-card__content__title sign-up__card__content__title">Sign Up</h1>
                <SignUpForm />
            </section>
            <figure className="auth-card__fig sign-up__card__fig">
                <AuthImg imgPublicId="evergreen-app/sign-up/sign-up-bg_a3cud7.jpg" imgWidth="1920" imgHeight="1280" />
            </figure>
        </div>
    );
}

export default SignUpCard;
