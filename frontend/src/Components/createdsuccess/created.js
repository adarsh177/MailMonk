import React from "react";
import "./created.scss";
const Created = (props) => {
  return (
    <div className="success-dialogue">
      <div className="success-title">Message</div>
      <div className="success-message">{props.value} created successfully</div>
      <div className="success-confirmation">
        <div className="ok-button">Ok</div>
      </div>
    </div>
  );
};

export default Created;
