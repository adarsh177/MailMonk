import React from "react";
import "./heading.css";
import ReactTooltip from "react-tooltip";

function Heading(Props) {
  return (
    <div className="heading-container">
      <div>
        <h1 className="heading">{Props.value}</h1>
      </div>
      <div className="tooltip-container">
        <a href={() => false} data-tip={Props.tooltip}>
          <i class="fas fa-info-circle info-button"></i>
        </a>
        <ReactTooltip
          place="right"
          type="info"
          delayHide={1000}
          effect="solid"
        />
      </div>
    </div>
  );
}

export default Heading;
