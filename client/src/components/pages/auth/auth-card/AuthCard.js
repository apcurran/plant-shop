import "./AuthCard.css";
import SignUpForm from "./sign-up-form/SignUpForm";
import LogInForm from "./log-in-form/LogInForm";
import EmailLinkForm from "./email-link-form/EmailLinkForm";
import AdminSignUpForm from "./admin-sign-up-form/AdminSignUpForm";
import AuthImg from "../auth-img/AuthImg";
import ResetPasswordForm from "./reset-password-form/ResetPasswordForm";

function AuthCard({ title, imgPublicId, imgWidth, imgHeight }) {
    const form = getFormType(title);

    function getFormType(title) {
        switch (title) {
            case "Sign Up":
                return <SignUpForm />;
            case "Log In":
                return <LogInForm />;
            case "Forgot Password":
                return <EmailLinkForm />;
            case "Reset Password":
                return <ResetPasswordForm />;
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
