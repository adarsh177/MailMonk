import React from "react";
import "./delete.scss";
const Deletedialogue = (props) => {
  return (
    <div className="delete-dialogue">
      <div className="delete-title">Confirmation Message</div>
      <div className="delete-message">
        Are you sure you want to delete the {props.value}?
      </div>
      <div className="delete-confirmation">
        <div className="no-button">No</div>
        <div className="yes-button">Yes</div>
      </div>
    </div>
  );
};

export default Deletedialogue;
