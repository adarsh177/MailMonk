import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Heading from "../../Components/heading/heading";
import DatePicker from "react-datepicker";
import {
    Navigation,
    MobileNavigationTop,
    MobileNavigationBottom,
} from "../../Components/navigation/navigation";
import "../Mail History/history.scss";

import "react-datepicker/dist/react-datepicker.css";

// using index.css as a global css for global styling of the form
import "../../index.css";

// using the Newcampaign for non global styling like positioning of particular elements
import "./newcampaign.css";

// Datepicker fuction

const handleStartDatetime = (e) => {
    e.preventDefault();
    document.getElementById("dateandTimeStart").click();
};

const handleEndDatetime = (e) => {
    e.preventDefault();
    document.getElementById("dateandTimeEnd").click();
};

// attachment handler
const handleAttchment = (e) => {
    e.preventDefault();
    document.getElementById("attachment-input").click();
};
function Newcampaign() {
    const alertit = () => {
        alert("hi");
    };

    // Tiny text editor log funtion

    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    return (
        <div className="newcampaign-container">
            <Navigation />
            <MobileNavigationTop />
            <div className="main">
                {/*  **** Heading component ***
        Containing props of "value" which is text of of heading and a "tooltip"  */}
                <div>
                    <Heading
                        value="New Campaign"
                        tooltip="Send mail to a person or group with a schedule feature in a reccuring manner"
                    />
                </div>
                {/* -----------------------------------------------------------------------------*/}

                <div>
                    <div>
                        <form>
                            <div className="row space-bw-rows">
                                <div className="col-md-4 col-sm-12 space-bw-rows">
                                    <input
                                        onSelect={alertit}
                                        className="inputfield-form"
                                        type="text"
                                        placeholder="To"
                                        name="to"
                                    />
                                </div>
                                <div className="col-md-4 col-sm-12 space-bw-rows">
                                    <input
                                        onSelect={alertit}
                                        className="inputfield-form"
                                        type="text"
                                        placeholder="CC (optional)"
                                        name="cc"
                                    />
                                </div>
                                <div className="col-md-4 col-sm-12 space-bw-rows">
                                    <input
                                        onSelect={alertit}
                                        className="inputfield-form"
                                        type="text"
                                        placeholder="BCC (optional)"
                                        name="bcc"
                                    />
                                </div>
                            </div>
                            <div className="row space-bw-rows">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <input
                                        className="inputfield-form fullWidthInputField"
                                        type="text"
                                        placeholder="Subject"
                                        name="subject"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-8 flex-container flex-start-element  space-bw-rows media-flex-center">
                                    <button
                                        onClick={handleStartDatetime}
                                        className="form-button"
                                    >
                                        <i class="far fa-calendar-alt"></i>{" "}
                                        &nbsp; Start Date
                                    </button>

                                    <DatePicker
                                        className="dateandtime visually-hidden"
                                        id="dateandTimeStart"
                                        selected={startDate}
                                        onChange={(dateStart) =>
                                            setStartDate(dateStart)
                                        }
                                        minDate={new Date()}
                                        placeholderText="Select a start date in the future"
                                        title="Select a campaign start date"
                                    />
                                    <button
                                        onClick={handleEndDatetime}
                                        className="form-button"
                                    >
                                        <i class="far fa-calendar-alt"></i>{" "}
                                        &nbsp; End Date
                                    </button>
                                    <DatePicker
                                        className="dateandtime visually-hidden"
                                        id="dateandTimeEnd"
                                        selected={endDate}
                                        onChange={(dateEnd) =>
                                            setEndDate(dateEnd)
                                        }
                                        minDate={startDate}
                                        placeholderText="Select a end date in the future"
                                        title="Select a campaign end date"
                                    />
                                </div>
                                <div className="col-lg-4 flex-container flex-end-elements media-flex-center">
                                    <form className="flex-container">
                                        <div className="col-lg-8">
                                            <label
                                                class="visually-hidden"
                                                for="specificSizeInputName"
                                            >
                                                Intervals
                                            </label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="specificSizeInputName"
                                                placeholder="Mail Intervals (e.g. 5)"
                                            />
                                        </div>
                                        <div className="col-lg-4">
                                            <label
                                                class="visually-hidden"
                                                for="specificSizeSelect"
                                            >
                                                Units
                                            </label>
                                            <select
                                                class="form-select"
                                                id="specificSizeSelect"
                                            >
                                                <option selected>Unit</option>
                                                <option value="1">
                                                    Second
                                                </option>
                                                <option value="2">
                                                    Minute
                                                </option>
                                                <option value="3">Hour</option>
                                                <option value="4">Days</option>
                                                <option value="5">Week</option>
                                                <option value="6">Month</option>
                                                <option value="7">Years</option>
                                            </select>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="row space-bw-rows">
                                <div class="col-12"></div>
                                <Editor
                                    /* ----------------------- API KEY OF TINY EDITOR -----------------------*/
                                    apiKey="o5lchlleh25gjgasjyzrew82r7s9ael2vebhqf80snd45dky"
                                    /* ----------------------- API KEY OF TINY EDITOR ----------------------- if possible add it to dotenv*/
                                    onInit={(evt, editor) =>
                                        (editorRef.current = editor)
                                    }
                                    initialValue="<p>Tye your E-mail here...</p>"
                                    init={{
                                        height: 500,
                                        menubar: false,
                                        plugins: [
                                            "advlist autolink lists link image charmap print preview anchor",
                                            "searchreplace visualblocks code fullscreen",
                                            "insertdatetime media table paste code help wordcount",
                                        ],
                                        toolbar:
                                            "undo redo | formatselect | " +
                                            "bold italic backcolor | alignleft aligncenter " +
                                            "alignright alignjustify | bullist numlist outdent indent | " +
                                            "removeformat | help",
                                        content_style:
                                            "body { font-family:Roboto,Arial,sans-serif; font-size:14px }",
                                    }}
                                />
                                <button onClick={log}>
                                    Log editor content
                                </button>
                            </div>
                            <div className="row space-bw-rows flex-container">
                                <div className="col-lg-6 col-sm-12 attachment-container media-flex-center space-bw-rows">
                                    <button
                                        onClick={handleAttchment}
                                        className=" attachment-button"
                                    >
                                        <i class="fas fa-paperclip paper-clip-icon"></i>
                                    </button>
                                    <input
                                        className="attachment-button visually-hidden"
                                        type="file"
                                        id="attachment-input"
                                    />
                                    <label className="attachment-text">
                                        Attachment (upto 10MB){" "}
                                    </label>
                                </div>
                                <div className="col-lg-6 col-sm-12 flex-container flex-end-elements media-flex-center media-margin space-bw-rows">
                                    <button className="form-button stroke-button">
                                        Cancel
                                    </button>

                                    <button className="form-button">
                                        <i class="fas fa-paper-plane"></i>
                                        &nbsp;&nbsp;Send
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="footer">
                <MobileNavigationBottom />
            </div>
        </div>
    );
}

export default Newcampaign;
