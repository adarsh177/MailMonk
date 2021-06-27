import React from "react";
import Add from "../../Components/add/add";
import { Link } from "react-router-dom";
import {
  Navigation,
  MobileNavigationTop,
  MobileNavigationBottom,
} from "../../Components/navigation/navigation";
import Heading from "../../Components/heading/heading";
import "./campaign.scss";
import { campaignData } from "../../Data/mail-campaign-data ";
const Campaigns = () => {
  const [active, setActive] = React.useState("Active");
  const [index, setIndex] = React.useState(1);

  return (
    <div className="campaign">
      <Navigation />
      <MobileNavigationTop />
      <div className="main">
        <div className="campaign-top">
          <Heading
            value="Campaigns"
            tooltip="List of mails ralated to campaigns"
          />
          <div className="add-campaign-button">
            <Add value="Campaign" />
          </div>
        </div>

        <div className="tabs">
          <div
            className={`tab-item active ${index === 1 && "active-btn"}`}
            onClick={() => {
              setActive("Active");
              setIndex(1);
            }}
          >
            <i class="fas fa-circle green"></i> &nbsp;Active
          </div>
          <div
            className={`tab-item ${index === 2 && "active-btn"}`}
            onClick={() => {
              setActive("Finished");
              setIndex(2);
            }}
          >
            <i class="fas fa-circle red"></i> &nbsp;Finished
          </div>
        </div>

        <div className="campaign-details">
          <div className="campaign-heading-table">
            <div className="table-content-to">Name</div>
            <div className="table-content-subject">Subject</div>
            <div className="table-content-date">Date</div>
            <div className="table-content-view">Action</div>
          </div>

          {campaignData
            .filter((status) => {
              if (status.mode === active) {
                return true;
              }
            })
            .map((details) => {
              return (
                <div className="campaign-values-table">
                  <div className="table-content-to">{details.name}</div>
                  <div className="table-content-subject">{details.subject}</div>

                  <div className="table-content-date">{details.mode}</div>
                  <div className="table-content-view">
                    <Link to={`./${details.view}`} class="fas fa-eye"></Link>
                    <i class="fas fa-trash" onClick={() => {}}></i>
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

export default Campaigns;
