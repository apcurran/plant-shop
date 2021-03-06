import { useState } from "react";

import ErrorMsg from "../../../../ui/error-msg/ErrorMsg";
import Message from "../../../../ui/message/Message";
import LoadingSpinner from "../../../../ui/loading-spinner/LoadingSpinner";

function EmailLinkForm() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [userMessage, setUserMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true);

        try {
            const response = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email
                })
            });

            if (!response.ok) {
                const serverErrMsg = await response.json();

                throw Error(serverErrMsg.error);
            }

            const { message } = await response.json();
            setUserMessage(message);
            setIsLoading(false);

        } catch (err) {
            setIsLoading(false);
            setError(err.message);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="auth-card__content__form">
            <p className="auth-card__content__instructions">Please enter your email and we will send a link to reset your password.</p>
            <div className="auth-card__content__form-group">
                <label htmlFor="email" className="auth-card__content__form__label">Email</label>
                <input onChange={(event) => setEmail(event.target.value)} type="email" name="email" id="email" className="auth-card__content__form__input" required />
            </div>
            <button className="auth-card__content__form__submit-btn">Send Link</button>
            {isLoading ? <LoadingSpinner /> : null}
            {error ? <ErrorMsg error={error} /> : null}
            {userMessage ? <Message msg={userMessage} /> : null}
        </form>
    );
}

export default EmailLinkForm;
