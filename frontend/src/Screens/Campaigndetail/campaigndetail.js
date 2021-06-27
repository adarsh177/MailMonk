import React from "react";
import Heading from "../../Components/heading/heading";
import "./campaigndetail.css";
import {
    Navigation,
    MobileNavigationTop,
    MobileNavigationBottom,
} from "../../Components/navigation/navigation";
import "../Mail History/history.scss";

function Campaigndetail() {
    // all details are listed here
    const campaignName = "Mail for promotion";
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
    const nextScheduleondate = "12/05/2021";
    return (
        <div className="newcampaign-container">
            <Navigation />
            <MobileNavigationTop />
            <div className="main">
                {/* Main Heading --------------------------------------------------------------------*/}
                <div>
                    <Heading
                        value="Campaign Detail"
                        tooltip="All details regarding campaign"
                    />
                </div>
                {/* Core details ------------------------------------------------------------------- */}
                <div>
                    <div className="row">
                        <div className="col-lg-12">
                            <p className="Subject-content">
                                <span className="subject-heading">
                                    Campaign Name:
                                </span>
                                &nbsp;
                                {campaignName}
                            </p>
                        </div>
                    </div>
                    <div className="row campaign-core-details">
                        <div className="col-lg-10">
                            <p className="heading-content">
                                <span className="detail-headings"> From: </span>{" "}
                                {sender}
                            </p>
                            <p className="heading-content">
                                <span className="detail-headings">To: </span>{" "}
                                {reciepent}
                            </p>
                            <p className="heading-content">
                                <span className="detail-headings">
                                    Subject:{" "}
                                </span>{" "}
                                {emailSubject}
                            </p>
                            <p className="heading-content">
                                <span className="detail-headings">CC: </span>
                                {cc}
                            </p>
                            <p className="heading-content">
                                <span className="detail-headings">BCC: </span>{" "}
                                {bcc}
                            </p>
                            <p className="heading-content">
                                <span className="detail-headings">
                                    Starting Date:{" "}
                                </span>{" "}
                                {startDate}
                            </p>
                        </div>
                        <div className="col-lg-2">
                            <p className="heading-content">
                                <span className="detail-headings">Date: </span>
                                {emailDate}
                            </p>
                            <p className="heading-content">
                                {viewCount}{" "}
                                <span className="detail-headings">(views)</span>
                            </p>
                            <button className="form-button stroke-button delete-button">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>

                {/* Campaign contents-----------(Campaign content text is justified)--------------------------------------------------- */}
                <div className="row">
                    <div className="col-lg-12">
                        <p className="campaign-content">{campaignContent}</p>
                    </div>
                </div>
                {/* Next schedule indication------------------------------------------------------- */}
                <div className="row  media-flex-center media-margin space-bw-rows">
                    <div className="col-lg-12 flex-end-elements">
                        <p className="next-schedule-info">
                            Next Scheduled On {nextScheduleondate}
                        </p>
                    </div>
                </div>
            </div>
            <div className="footer">
                <MobileNavigationBottom />
            </div>
        </div>
    );
}

export default Campaigndetail;
