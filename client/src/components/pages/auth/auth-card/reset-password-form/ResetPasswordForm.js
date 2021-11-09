import { useState } from "react";
import { useParams } from "react-router-dom";
import ErrorMsg from "../../../../ui/error-msg/ErrorMsg";
import Message from "../../../../ui/message/Message";

function ResetPasswordForm() {
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [userMessage, setUserMessage] = useState("");

    const { id } = useParams();

    async function handleSubmit() {
        try {
            const response = await fetch("/api/auth/reset-password", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    tempId: id,
                    newPassword
                })
            });

            if (!response.ok) {
                const serverErrMsg = await response.json();

                throw Error(serverErrMsg.error);
            }

            const { message } = await response.json();
            setUserMessage(message);

        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="auth-card__content__form">
            <div className="auth-card__content__form-group">
                <label htmlFor="new-password" className="auth-card__content__form__label">New Password</label>
                <input onChange={(event) => setNewPassword(event.target.value)} type="password" name="new-password" id="new-password" className="auth-card__content__form__input" required />
            </div>
            <button className="auth-card__content__form__submit-btn">Update Password</button>
            {error ? <ErrorMsg error={error} /> : null}
            {userMessage ? <Message msg={userMessage} /> : null}
        </form>
    );
}

export default ResetPasswordForm;
