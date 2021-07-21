import "./AuthCard.css";
import SignUpForm from "./sign-up-form/SignUpForm";
import AuthImg from "../auth-img/AuthImg";

function AuthCard({ title, imgPublicId, imgWidth, imgHeight }) {
    const form = title === "Sign Up" ? <SignUpForm /> : null;

    return (
        <div className="auth-card">
            <section className="auth-card__content">
                <h1 className="auth-card__content__title">{title}</h1>
                {form}
            </section>
            <figure className="auth-card__fig">
                <AuthImg imgPublicId={imgPublicId} imgWidth={imgWidth} imgHeight={imgHeight} />
            </figure>
        </div>
    );
}

export default AuthCard;
