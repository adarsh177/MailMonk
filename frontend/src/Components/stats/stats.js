import React from "react";
import CountUp from "react-countup";
import "./stats.scss";
const Stats = (props) => {
  return (
    <div className="dashboard-stats">
      <div className="dashboard-stats-head">{props.head}</div>
      <div className="dashboard-stats-body">
        <div className="stats-content">
          <div className="number-of-stats">
            <CountUp end={props.num1} duration={3} />
          </div>
          <div className="name-of-stats">{props.name1}</div>
          <div className="name-of-stats">{props.subname1}</div>
        </div>
        <div className="divider"></div>
        <div className="stats-content">
          <div className="number-of-stats">
            <CountUp end={props.num2} duration={3} />
          </div>
          <div className="name-of-stats">{props.name2}</div>
          <div className="name-of-stats">{props.subame2}</div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
