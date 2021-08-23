import { Video, Transformation } from "cloudinary-react";

import "./SuccessAnimation.css";

function SuccessAnimation() {
    return (
        <div className="payment-success__anim-container">
            <Video className="payment-success__anim-vid" width="1920" height="1080" publicId="evergreen-app/payment-success/SeaShip-day_g8q5ib" loop={true} autoPlay={true} muted="muted">
                <Transformation width="1000" height="600" crop="fill" quality="auto" fetchFormat="auto" />
            </Video>
        </div>
    );
}

export default SuccessAnimation;
