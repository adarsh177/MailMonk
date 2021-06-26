import React from "react";
import Heading from "../../Components/heading/heading";
import "./campaigndetail.css";

function Campaigndetail() {
    // all details are listed here
    const emailSubject = "Test email";
    const emailDate = "12/12/2021";
    const viewCount = "400";
    const sender = "example@gmail.com";

    const reciepent = "example@gmail.com";

    const cc = "example@gmail.com";

    const bcc = "example@gmail.com";

    const startDate = "12/04/2021 14:25";
    const campaignContent =
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?Lorem ipsum dolor sit amet,  consectetur adipisicing elit. Eligendi non quis Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?Lorem ipsum dolor sit amet,  consectetur adipisicing elit. Eligendi non quis Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?Lorem ipsum dolor sit amet,  consectetur adipisicing elit. Eligendi non quis Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?Lorem ipsum dolor sit amet,  consectetur adipisicing elit. Eligendi non quis Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?Lorem ipsum dolor sit amet,  consectetur adipisicing elit. Eligendi non quis ";

    return (
        <div>
            <div>
                <Heading
                    value="Campaign Detail"
                    tooltip="All details regarding campaign"
                />
            </div>
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <p>Subject: {emailSubject}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-10">
                        <p>From: {sender}</p>
                        <p>To: {reciepent}</p>
                        <p>CC: {cc}</p>
                        <p>BCC: {bcc}</p>
                        <p>Starting Date: {startDate}</p>
                    </div>
                    <div className="col-lg-2">
                        <p>Date: {emailDate}</p>
                        <p>{viewCount} (views)</p>
                        <button className="form-button stroke-button delete-button">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <p>{campaignContent}</p>
                </div>
            </div>
        </div>
    );
}

export default Campaigndetail;
