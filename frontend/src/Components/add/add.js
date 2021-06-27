import React from "react";
import { Link } from "react-router-dom";
import "./add.scss";
const Add = (props) => {
  return (
    <Link className="add-button" to={`./${props.link}`}>
      <i class="fas fa-plus"></i>
      &nbsp; &nbsp; &nbsp;
      <div className="add-btn-value">{props.value}</div>
    </Link>
  );
};

export default Add;
