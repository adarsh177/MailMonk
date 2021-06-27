import React from "react";
import "./teammembers.scss";
const Team = () => {
  const [none, setNone] = React.useState("active");
  const handleDisplay = () => {
    setNone("none");
  };
  return (
    <div className={`team-members ${none}`}>
      <div className="cross" onClick={handleDisplay}>
        <i class="fas fa-times"></i>
      </div>
      <div className="created-by">
        MAILMONK - Created by{" "}
        <a href="https://github.com/adarsh177">Adarsh Shrivastava</a>
        &nbsp;,&nbsp;
        <a href="https://github.com/Abhishek1342">Abhishek Kumar</a>
        &nbsp;and&nbsp;
        <a href="https://github.com/Pratik-Kumar-621">Pratik Kumar</a>&nbsp;
      </div>
    </div>
  );
};

export default Team;
