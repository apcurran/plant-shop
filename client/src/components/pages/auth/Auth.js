import Header from "../../layout/header/Header";
import MainWrapper from "../../layout/main-wrapper/MainWrapper";
import AuthCard from "./auth-card/AuthCard";

function Auth({ title, imgPublicId, imgWidth, imgHeight }) {
    return (
        <div className="auth">
            <MainWrapper>
                <Header />
                <AuthCard title={title} imgPublicId={imgPublicId} imgWidth={imgWidth} imgHeight={imgHeight} />
            </MainWrapper>
        </div>
    );
}

export default Auth;
