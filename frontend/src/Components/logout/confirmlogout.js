import React from "react";
import "./confirmlogout.scss";
const ConfirmLogout = () => {
  return (
    <div className="logout-dialogue">
      <div className="logout-title">Message</div>
      <div className="logout-message">Confirm Logout?</div>
      <div className="logout-confirmation">
        <div className="ok-button">Ok</div>
      </div>
    </div>
  );
};

export default ConfirmLogout;
