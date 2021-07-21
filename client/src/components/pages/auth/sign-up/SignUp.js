import "./SignUp.css";
import Header from "../../../layout/header/Header";
import AuthCard from "./auth-card/AuthCard";

function SignUp() {
    return (
        <div className="sign-up">
            <main className="sign-up-main-wrapper">
                <Header />
                <AuthCard />
            </main>
        </div>
    );
}

export default SignUp;
