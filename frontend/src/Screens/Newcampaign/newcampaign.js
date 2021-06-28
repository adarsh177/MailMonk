import React, { useRef, useState, useEffect } from "react";
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
import Selectgroup from "../../Components/Selectgroup/Selectgroup";
import { withRouter } from "react-router-dom";
import FirebaseUtil from "../../Utils/FirebaseUtil";
import Loader from "../../Components/Loader";
import firebase from 'firebase';
import ContactAPIs from "../../APIs/ContactAPIs";
import CampaignAPIs from "../../APIs/CampaignAPIs";

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
function Newcampaign(props) {
    const firebaseUtil = new FirebaseUtil();
    const [showLoading, setShowLoading] = useState(true);
    const [groups, setGroups] = useState([]);
    const [recepientTo, setRecepientTo] = useState([]);
    const [recepientCc, setRecepientCc] = useState([]);
    const [recepientBcc, setRecepientBcc] = useState([]);
    const [showContactTarget, setShowContactTarget] = useState(null);
    const [fromText, setFromText] = useState("");
    const [subjectText, setSubjectText] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [name, setName] = useState("");
    const [mailInterval, setMailInterval] = useState("");
    const [mailIntervalUnit, setMailIntervalUnit] = useState("Unit");

    // Tiny text editor log funtion

    const editorRef = useRef(null);

    useEffect(() => {
        // Checking User
        firebase.auth().onAuthStateChanged((user) => {
          if(user == null){
            props.history.push('/login');
          }
          LoadData();
        });
      }, []);
  
    async function LoadData(){
        let groups = await ContactAPIs.GetGroups();
        if(groups == null){
            props.history.push('/login');
            return;
        }
        setGroups(groups);
        setShowLoading(false);
    }

    const ShowContactSelect = (target) => {
        setShowContactTarget(target);
    };

    async function SendCampaign(){
            if(fromText.length == 0){
                alert('Please enter from');
                return;
            }
            if(subjectText.length == 0){
                alert('Please enter subject');
                return;
            }
            if(editorRef.current.getContent().length == 0){
                alert('Please enter body');
                return;
            }
            if(recepientTo.length == 0 && recepientCc.length == 0 && recepientBcc.length == 0){
                alert('Please enter atleast one field : to, cc, bcc');
                return;
            }
            if(mailIntervalUnit === "Unit"){
                alert('Please select Interval');
                return;
            }
            if(mailInterval <= 0){
                alert('Please select Interval');
                return;
            }

            let interval = 0;
            switch(mailIntervalUnit){
                case "Second":
                    interval = mailInterval * 1000;
                    break;
                case "Minute":
                    interval = mailInterval * 60 * 1000;
                    break;
                case "Hour":
                    interval = mailInterval * 1000 * 60 * 60;
                    break;
                case "Days":
                    interval = mailInterval * 1000 * 60 * 60 * 24;
                    break;
                case "Month":
                    interval = mailInterval * 1000 * 60 * 60 * 24 * 30;
                    break;
                case "Years":
                    interval = mailInterval * 1000 * 60 * 60 * 24 * 365;
                    break;
            }

            let data = {
                to: recepientTo,
                cc: recepientCc,
                bcc: recepientBcc,
                subject: subjectText,
                body: editorRef.current.getContent(),
                from: fromText,
                startTime: startDate.getTime().toString(),
                endTime: endDate.getTime().toString(),
                name: name,
                interval: interval
            };
            console.log(data);

            setShowLoading(true);
            let rslt = await CampaignAPIs.AddCampaign(data);
            setShowLoading(false);
            console.log(rslt);
            if(rslt == null){
                props.history.push('/login');
            }else{
                if(rslt){
                    alert('Campaign Started');
                    props.history.push('/campaign');
                }else{
                    alert('Error Sending Mail, try again');
                }
            }
        }


    return (
        <div className="newcampaign-container">
            <Navigation />
            <Loader show={showLoading} />
            <MobileNavigationTop />
            {showContactTarget === "to" && 
                <Selectgroup
                groups={groups}
                head={"To"}
                values={recepientTo}
                onSave={(data) => {
                    setRecepientTo(data);
                    setShowContactTarget(null);
                }}
                />}
                {showContactTarget === "cc" &&
                <Selectgroup
                groups={groups}
                head={"Cc"}
                values={recepientCc}
                onSave={(data) => {
                    setRecepientCc(data);
                    setShowContactTarget(null);
                }}
                />}
                {showContactTarget === "bcc" && 
                <Selectgroup
                groups={groups}
                head={"Bcc"}
                values={recepientBcc}
                onSave={(data) => {
                    setRecepientBcc(data);
                    setShowContactTarget(null);
                }}
                />}
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
                                <div className="col-md-3 col-sm-12">
                                    <input
                                        className="inputfield-form"
                                        type="text"
                                        placeholder="Campaign Name"
                                        name="campaignName"
                                        value={name}
                                        onChange={(ev) => setName(ev.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row space-bw-rows">
                                <div className="col-md-3 col-sm-12 space-bw-rows">
                                    <input
                                        className="inputfield-form"
                                        type="text"
                                        placeholder="From"
                                        name="from"
                                        value={fromText}
                                        onChange={(ev) => setFromText(ev.target.value)}
                                    />
                                </div>
                                <div className="col-md-3 col-sm-12 space-bw-rows">
                                    <input
                                        onSelect={() => ShowContactSelect("to")}
                                        className="inputfield-form"
                                        type="text"
                                        placeholder="To"
                                        name="to"
                                        value={recepientTo.join(", ")}
                                    />
                                </div>
                                <div className="col-md-3 col-sm-12 space-bw-rows">
                                    <input
                                        onSelect={() => ShowContactSelect("cc")}
                                        className="inputfield-form"
                                        type="text"
                                        placeholder="CC (optional)"
                                        name="cc"
                                        value={recepientCc.join(", ")}
                                    />
                                </div>
                                <div className="col-md-3 col-sm-12 space-bw-rows">
                                    <input
                                        onSelect={() => ShowContactSelect("bcc")}
                                        className="inputfield-form"
                                        type="text"
                                        placeholder="BCC (optional)"
                                        name="bcc"
                                        value={recepientBcc.join(", ")}
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
                                        value={subjectText}
                                        onChange={(ev) => setSubjectText(ev.target.value)}
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
                                        timeInputLabel="Time:"
                                        dateFormat="MM/dd/yyyy h:mm aa"
                                        showTimeInput
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
                                        timeInputLabel="Time:"
                                        dateFormat="MM/dd/yyyy h:mm aa"
                                        showTimeInput
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
                                                value={mailInterval}
                                                onChange={ev => setMailInterval(ev.target.value)}
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
                                                value={mailIntervalUnit}
                                                onChange={ev => setMailIntervalUnit(ev.target.value)}
                                            >
                                                <option selected>Unit</option>
                                                <option value="Second">
                                                    Second
                                                </option>
                                                <option value="Minute">
                                                    Minute
                                                </option>
                                                <option value="Hour">Hour</option>
                                                <option value="Days">Days</option>
                                                <option value="Month">Month</option>
                                                <option value="Years">Years</option>
                                            </select>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="row space-bw-rows">
                                <div class="col-12"></div>
                                <Editor
                                    /* ----------------------- API KEY OF TINY EDITOR -----------------------*/
                                    apiKey="ek4b0atm5si0kw6oelumkokk5cimsl6z20a77vl4mh7c2lcr"
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
                            </div>
                            <div className="row space-bw-rows flex-container">
                                <div className="col-lg-6 col-sm-12 attachment-container media-flex-center space-bw-rows">
                                    {/* <button
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
                                    </label> */}
                                </div>
                                <div className="col-lg-6 col-sm-12 flex-container flex-end-elements media-flex-center media-margin space-bw-rows">
                                    <button className="form-button stroke-button">
                                        Cancel
                                    </button>

                                    <button className="form-button" onClick={(ev) => {
                                        ev.preventDefault();
                                        SendCampaign();
                                    }}>
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

export default withRouter(Newcampaign);
