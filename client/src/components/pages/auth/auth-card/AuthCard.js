import "./AuthCard.css";
import SignUpForm from "./sign-up-form/SignUpForm";
import LogInForm from "./log-in-form/LogInForm";
import AdminSignUpForm from "./admin-sign-up-form/AdminSignUpForm";
import AuthImg from "../auth-img/AuthImg";

function AuthCard({ title, imgPublicId, imgWidth, imgHeight }) {
    const form = getFormType(title);

    function getFormType(title) {
        switch (title) {
            case "Sign Up":
                return <SignUpForm />;
            case "Log In":
                return <LogInForm />;
            case "Admin Sign Up":
                return <AdminSignUpForm />;
            case "Admin Log In":
                return <LogInForm />;
            default:
                return "Something went wrong. Check props on component.";
        }
    }

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
