import React, {useState, useEffect} from "react";
import Add from "../../Components/add/add";
import { Link, withRouter } from "react-router-dom";
import {
  Navigation,
  MobileNavigationTop,
  MobileNavigationBottom,
} from "../../Components/navigation/navigation";
import Heading from "../../Components/heading/heading";
import "./campaign.scss";
import Loader from "../../Components/Loader";
import FirebaseUtil from '../../Utils/FirebaseUtil';
import firebase from 'firebase';
import CampaignAPIs from "../../APIs/CampaignAPIs";

const Campaigns = (props) => {
  const firebaseUtil = new FirebaseUtil();
  const [active, setActive] = React.useState("running");
  const [index, setIndex] = React.useState(1);
  const [showLoading, setShowLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    // Checking User
    firebase.auth().onAuthStateChanged(async (user) => {
      if(user == null){
        props.history.push('/login');
        return;
      }
      await LoadData("running");
      setShowLoading(false);
    });
  }, []);

  async function LoadData(status){
    // loading data
    setShowLoading(true);
    let campaignList = await CampaignAPIs.GetCampaigns(status);
    if(campaignList == null){
          // token expired
          props.history.push('/login');
          return;
    }else{
      setCampaigns(campaignList);
    }
    console.log('camp', campaignList);
    setShowLoading(false);
  }


  return (
    <div className="campaign">
      <Loader show={showLoading} />
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
            onClick={async () => {
              setActive("running");
              setCampaigns([]);
              LoadData("running");
              setIndex(1);
            }}
          >
            <i class="fas fa-circle green"></i> &nbsp;Active
          </div>
          <div
            className={`tab-item ${index === 2 && "active-btn"}`}
            onClick={() => {
              setActive("cancelled");
              setCampaigns([]);
              LoadData("cancelled");
              setIndex(2);
            }}
          >
            <i class="fas fa-circle red"></i> &nbsp;Cancelled
          </div>
          <div
            className={`tab-item ${index === 3 && "active-btn"}`}
            onClick={() => {
              setActive("completed");
              setCampaigns([]);
              LoadData("completed");
              setIndex(3);
            }}
          >
            <i class="fas fa-circle blue"></i> &nbsp;Completed
          </div>
        </div>

        <div className="campaign-details">
          <div className="campaign-heading-table">
            <div className="table-content-to">Name</div>
            <div className="table-content-subject">Subject</div>
            <div className="table-content-date">Date</div>
            <div className="table-content-view">Action</div>
          </div>

          {campaigns
            .map((details) => {
              return (
                <div className="campaign-values-table">
                  <div className="table-content-to">{details.name}</div>
                  <div className="table-content-subject">{details.subject}</div>

                  <div className="table-content-date">{new Date(details.startTime).toLocaleString()}</div>
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

export default withRouter(Campaigns);
