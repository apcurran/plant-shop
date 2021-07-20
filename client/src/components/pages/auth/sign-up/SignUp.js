import "./SignUp.css";
import Header from "../../../layout/header/Header";
import SignUpCard from "./sign-up-card/SignUpCard";

function SignUp() {
    return (
        <div className="sign-up">
            <main className="sign-up-main-wrapper">
                <Header />
                <SignUpCard />
            </main>
        </div>
    );
}

export default SignUp;
