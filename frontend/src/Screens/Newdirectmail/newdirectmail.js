import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Heading from "../../Components/heading/heading";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// using index.css as a global css for global styling of the form
import "../../index.css";

// using the newdirectmail for non global styling like positioning of particular elements
import "./newdirectmail.css";

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
function Newdirectmail() {
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

    return (
        <>
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
                <div className="continer">
                    <form>
                        <div className="row space-bw-rows">
                            <div className="col-md-4 col-sm-12">
                                <input
                                    onSelect={alertit}
                                    className="inputfield-form"
                                    type="text"
                                    placeholder="To"
                                    name="to"
                                />
                            </div>
                            <div className="col-md-4 col-sm-12">
                                <input
                                    onSelect={alertit}
                                    className="inputfield-form"
                                    type="text"
                                    placeholder="CC (optional)"
                                    name="cc"
                                />
                            </div>
                            <div className="col-md-4 col-sm-12">
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
                            <div className="col-lg-9 col-md-9 col-sm-12">
                                <input
                                    className="inputfield-form"
                                    type="text"
                                    placeholder="Subject"
                                    name="subject"
                                />
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
                            <button onClick={log}>Log editor content</button>
                        </div>
                        <div className="row space-bw-rows flex-container">
                            <div className="col-lg-3 col-sm-12 attachment-container">
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
                            <div className="col-lg-8 col-sm-12 flex-container flex-end-elements">
                                <button className="form-button stroke-button">
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDatetime}
                                    className="form-button"
                                >
                                    <i class="far fa-calendar-alt"></i> &nbsp;
                                    Schedule
                                </button>

                                <DatePicker
                                    className="dateandtime visually-hidden"
                                    id="dateandTime"
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    timeInputLabel="Time:"
                                    dateFormat="MM/dd/yyyy h:mm aa"
                                    showTimeInput
                                    minDate={new Date()}
                                    placeholderText="Select a date in the future"
                                    title="Schedule your mail"
                                />

                                <button className="form-button">
                                    <i class="fas fa-paper-plane"></i>
                                    &nbsp;&nbsp;Send
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Newdirectmail;
