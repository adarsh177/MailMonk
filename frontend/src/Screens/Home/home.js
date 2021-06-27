import React from "react";
import logo from "../../Resources/MailMonk Without shadow.png";
import { Link } from "react-router-dom";
import "./home.css";
import Landingbg from "../../Resources/Landingbackground.svg";
import Landingimg from "../../Resources/Landingimage.svg";

function Home() {
    return (
        <div className="custom-flexbox">
            <div className="row">
                <div className="col-lg-5 col-md-7 custom-flexbox custom-padding mediacssBranding">
                    <img
                        className="logo-mailmonk-50px"
                        src={logo}
                        alt="MailMonk"
                    />
                    <h1 className="Landing-heading">MailMonk</h1>
                    <p className="tag-line">
                        The trusted and the best platform for sending mails for
                        campains and business purpose
                    </p>
                    <button className="form-button custom-landing-button">
                        SignUp For Free
                    </button>
                    <p className="already-account-info">
                        &#8226; Alreary have an account..{" "}
                        <Link to="/login" className="Login-link">
                            Log In
                        </Link>
                    </p>
                </div>
                <div className="col-lg-7 col-md-7 custom-flexbox displaynone">
                    <div className="Landing-image-section custom-flexbox">
                        <img
                            className="landing-illustration"
                            src={Landingimg}
                            alt="Mail Illustration"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
