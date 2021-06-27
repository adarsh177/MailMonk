import React from "react";
import "./Selectgroup.css";

function Selectgroup() {
    return (
        <div className="outer-container">
            <div className="inner-container">
                <div className="inner-elements">
                    <input type="checkbox" />
                    <label> Group Name</label>
                </div>
                <div className="inner-elements">
                    <input type="checkbox" />
                    <label> Group Name</label>
                </div>
                <div className="inner-elements">
                    <input type="checkbox" />
                    <label> Group Name</label>
                </div>
                <div className="inner-elements">
                    <input type="checkbox" />
                    <label> Group Name</label>
                </div>
                <div className="inner-elements">
                    <input type="checkbox" />
                    <label> Group Name</label>
                </div>
                <div className="inner-elements">
                    <input type="checkbox" />
                    <label> Custom</label>
                </div>
                <div className="inner-elements">
                    <input
                        className="textfieldofgroup"
                        name="custom-email-input"
                        type="text"
                    />
                </div>
                <div className="flex-container justify-center">
                    <button className="form-button space-bw-row ">Save</button>
                </div>
            </div>
        </div>
    );
}

export default Selectgroup;
