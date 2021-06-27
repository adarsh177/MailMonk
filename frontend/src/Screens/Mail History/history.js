import React from "react";
import { Link } from "react-router-dom";
import {
    Navigation,
    MobileNavigationTop,
    MobileNavigationBottom,
} from "../../Components/navigation/navigation";
import Heading from "../../Components/heading/heading";
import "./history.scss";
import { historyData } from "../../Data/mail-history-data";
const History = () => {
  return (
    <div className="history">
      <Navigation />
      <MobileNavigationTop />
      <div className="main">
        <Heading
          value="Mail History"
          tooltip="List of all previous direct mails and campaigns"
        />

                <div className="history-details" data-simplebar>
                    <div className="history-heading-table">
                        <div className="table-content-to">To</div>
                        <div className="table-content-subject">Subject</div>
                        <div className="table-content-type">Type</div>
                        <div className="table-content-date">Date</div>
                        <div className="table-content-view">View</div>
                    </div>
                    {historyData.map((details) => {
                        return (
                            <div className="history-values-table">
                                <div className="table-content-to">
                                    {details.to}
                                </div>
                                <div className="table-content-subject">
                                    {details.subject}
                                </div>
                                <div className="table-content-type">
                                    {details.type}
                                </div>
                                <div className="table-content-date">
                                    {details.date}
                                </div>
                                <div className="table-content-view">
                                    <Link
                                        to={`./${details.view}`}
                                        class="fas fa-eye"
                                    ></Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="footer">
                <MobileNavigationBottom />
            </div>
        </div>
    );
};

export default History;
