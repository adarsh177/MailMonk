import React from "react";
import "./Addcontact.css";

function Selectgroup() {
    const importCSV = (e) => {
        e.preventDefault();
        document.getElementById("attach-csv").click();
    };

    return (
        <div className="outer-container">
            <div className="inner-container">
                <div className="inner-elements">
                    <div>
                        <p>Import CSV</p>
                        <button
                            onClick={importCSV}
                            className=" attachment-button"
                        >
                            <i class="fas fa-paperclip paper-clip-icon"></i>
                        </button>
                        <input
                            className="attachment-button visually-hidden"
                            type="file"
                            id="attach-csv"
                            accept=".csv"
                        />
                        <label className="attachment-text">
                            Upload a (.csv) file
                        </label>
                    </div>
                    <div className="space-bw-rows">
                        <p>OR enter single Name and Email address</p>
                        <input
                            className="textfieldofaddcontact"
                            name="custom-name-input"
                            type="text"
                            placeholder="Enter Name"
                        />
                        <input
                            className="textfieldofaddcontact"
                            name="custom-email-input"
                            type="email"
                            placeholder="Enter Email"
                        />
                    </div>
                    <div className="flex-container justify-center">
                        <button className="form-button space-bw-row ">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Selectgroup;
