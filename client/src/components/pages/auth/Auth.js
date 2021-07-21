import "./Auth.css";
import Header from "../../layout/header/Header";
import AuthCard from "./sign-up/auth-card/AuthCard";

function Auth({ title, imgPublicId, imgWidth, imgHeight }) {
    return (
        <div className="auth">
            <main className="auth-main-wrapper">
                <Header />
                <AuthCard title={title} imgPublicId={imgPublicId} imgWidth={imgWidth} imgHeight={imgHeight} />
            </main>
        </div>
    );
}

export default Auth;
