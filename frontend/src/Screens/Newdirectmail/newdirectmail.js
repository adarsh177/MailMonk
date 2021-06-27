import React, { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Heading from "../../Components/heading/heading";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
    Navigation,
    MobileNavigationTop,
    MobileNavigationBottom,
} from "../../Components/navigation/navigation";
import "../Mail History/history.scss";

// using index.css as a global css for global styling of the form
import "../../index.css";

// using the newdirectmail for non global styling like positioning of particular elements
import "./newdirectmail.css";
import { withRouter } from "react-router-dom";
import FirebaseUtil from '../../Utils/FirebaseUtil';
import firebase from 'firebase';
import Loader from "../../Components/Loader";
import Selectgroup from "../../Components/Selectgroup/Selectgroup";
import ContactAPIs from "../../APIs/ContactAPIs";
import ReceiptAPIs from "../../APIs/ReceiptAPIs";

// Datepicker fuction

const handleDatetime = (e) => {
    e.preventDefault();
    document.getElementById("dateandTime").click();
};

// attachment handler
const handleAttchment = (e) => {
    e.preventDefault();
    document.getElementById("attachment-input").click();
};
function Newdirectmail(props) {
    const firebaseUtil = new FirebaseUtil();
    const [showLoading, setShowLoading] = useState(true);
    const [groups, setGroups] = useState([]);
    const [recepientTo, setRecepientTo] = useState([]);
    const [recepientCc, setRecepientCc] = useState([]);
    const [recepientBcc, setRecepientBcc] = useState([]);
    const [showContactTarget, setShowContactTarget] = useState(null);
    const [fromText, setFromText] = useState("");
    const [subjectText, setSubjectText] = useState("");

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

    // Tiny text editor log funtion

    const editorRef = useRef(null);

    const [startDate, setStartDate] = useState(new Date());

    async function SendReceipt(time){

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

        let data = {
            to: recepientTo,
            cc: recepientCc,
            bcc: recepientBcc,
            subject: subjectText,
            body: editorRef.current.getContent(),
            from: fromText,
            time: time
        };

        setShowLoading(true);
        let rslt = await ReceiptAPIs.NewReceipt(data);
        setShowLoading(false);
        console.log(rslt);
        if(rslt == null){
            props.history.push('/login');
        }else{
            if(rslt){
                alert('Mail added to queue.');
                props.history.push('/dashboard');
            }else{
                alert('Error Sending Mail, try again');
            }
        }
    }

    function ScheduleMail(){
        let cnf = window.confirm(`Send mail on : ${startDate.toLocaleString()} ?`);
        console.log(startDate);
        if(cnf){
            SendReceipt(startDate.getTime());
        }
    }

    return (
        <div className="newcampaign-container">
            <Selectgroup
                groups={groups}
                head={showContactTarget}
                valuesTo={recepientTo}
                valuesCc={recepientCc}
                valuesBcc={recepientBcc}
                onSave={(data, target) => {
                    if(target == "to")
                        setRecepientTo(data);
                    if(target == "cc")
                        setRecepientCc(data);
                    if(target == "bcc")
                        setRecepientBcc(data);
                    
                    setShowContactTarget(null);
                }}
                target={showContactTarget}
                />
            <Loader show={showLoading} />
            <Navigation />
            <MobileNavigationTop />
            <div className="main">
                {/*  **** Heading component ***
        Containing props of "value" which is text of of heading and a "tooltip"  */}
                <div>
                    <Heading
                        value="New Direct Mail"
                        tooltip="Send direct mail to a person or group with a schedule feature."
                    />
                </div>
                {/* -----------------------------------------------------------------------------*/}

                <div>
                    <div>
                        <form>
                            <div className="row">
                                <div className="col-md-3 col-sm-12 space-bw-rows">
                                    <input
                                        className="inputfield-form "
                                        type="text"
                                        placeholder="From"
                                        name="from"
                                        value={fromText}
                                        onChange={ev => setFromText(ev.target.value)}
                                    />
                                </div>
                                <div className="col-md-3 col-sm-12 space-bw-rows">
                                    <input
                                        onSelect={() => ShowContactSelect("to")}
                                        className="inputfield-form "
                                        type="text"
                                        placeholder="To"
                                        name="to"
                                        value={recepientTo.length > 0 ? recepientTo.join(", ") : ""}
                                    />
                                </div>
                                <div className="col-md-3 col-sm-12 space-bw-rows">
                                    <input
                                        onSelect={() => ShowContactSelect("cc")}
                                        className="inputfield-form "
                                        type="text"
                                        placeholder="CC (optional)"
                                        name="cc"
                                        value={recepientCc.length > 0 ? recepientCc.join(", ") : ""}
                                    />
                                </div>
                                <div className="col-md-3 col-sm-12 space-bw-rows">
                                    <input
                                        onSelect={() => ShowContactSelect("bcc")}
                                        className="inputfield-form "
                                        type="text"
                                        placeholder="BCC (optional)"
                                        name="bcc"
                                        value={recepientBcc.length > 0 ? recepientBcc.join(", ") : ""}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 space-bw-rows">
                                    <input
                                        className="inputfield-form"
                                        type="text"
                                        placeholder="Subject"
                                        name="subject"
                                        value={subjectText}
                                        onChange={ev => setSubjectText(ev.target.value)}
                                    />
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
                                <div className="col-lg-3 col-sm-12 attachment-container media-flex-center media-margin space-bw-rows">
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
                                <div className="col-lg-8 col-sm-12 flex-container flex-end-elements media-flex-center media-margin space-bw-rows">
                                    <button className="form-button stroke-button" onClick={() =>props.history.goBack()}>
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleDatetime}
                                        className="form-button icon-button"
                                    >
                                        <i class="far fa-calendar-alt"></i>{" "}
                                        &nbsp; Schedule
                                    </button>

                                    <DatePicker
                                        className="dateandtime visually-hidden"
                                        id="dateandTime"
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        onCalendarClose={() => ScheduleMail()}
                                        timeInputLabel="Time:"
                                        dateFormat="MM/dd/yyyy h:mm aa"
                                        showTimeInput
                                        minDate={new Date()}
                                        placeholderText="Select a date in the future"
                                        title="Schedule your mail"
                                    />

                                    <button className="form-button  icon-button" onClick={(ev) => {
                                        ev.preventDefault();
                                        SendReceipt(new Date().getTime());
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

export default withRouter(Newdirectmail);
