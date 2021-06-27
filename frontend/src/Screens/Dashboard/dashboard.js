import React, { useEffect, useState } from "react";
import noEmail from "../../Resources/no-emails.svg";
import {
  Navigation,
  MobileNavigationTop,
  MobileNavigationBottom,
} from "../../Components/navigation/navigation";
import "./dashboard.scss";
import Add from "../../Components/add/add";
import Stats from "../../Components/stats/stats";
import { campaignData } from "../../Data/mail-campaign-data ";
import { Link, withRouter } from "react-router-dom";
import FirebaseUtil from '../../Utils/FirebaseUtil';
import firebase from 'firebase';
import Loader from "../../Components/Loader";


const DashBoard = (props) => {
  const firebaseUtil = new FirebaseUtil();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // Checking User
    firebase.auth().onAuthStateChanged((user) => {
      if(user == null){
        props.history.push('/login');
      }
      setShowLoading(false);
    });
  }, []);

  return (
    <div className="dashboard">
      <Loader show={showLoading} />
      <Navigation routerHistory={props.history} />
      <MobileNavigationTop />
      <div className="main-dashboard">
        <div className="top-add-buttons">
          <Add value="Campaign" />
          <Add value="Direct Mail" />
        </div>
        <div className="no-email-yet">
          <img src={noEmail} alt="" />
        </div>
        <div className="stats-dashboard">
          <Stats
            head="Statistics"
            num1="25"
            name1="Active Campaigns"
            num2="10"
            name2="Total Mail Sent"
          />
          <Stats
            head="Last Mail"
            num1="25"
            name1="CTR "
            subname1="(Click Through Rate)"
            num2="10"
            name2="Views"
          />
        </div>

        <div className="upcoming-campaigns">
          <h2 className="upcoming-campaigns-title">Upcoming Campaigns</h2>
          <div className="upcoming-campaign-details">
            <div className="upcoming-campaign-heading-table">
              <div className="table-content-to">Name</div>
              <div className="table-content-date">Date</div>
              <div className="table-content-view">Action</div>
            </div>

            {campaignData
              .filter((status) => {
                if (status.mode === "Active") {
                  return true;
                }
              })
              .map((details) => {
                return (
                  <div className="upcoming-campaign-values-table">
                    <div className="table-content-to">{details.name}</div>

                    <div className="table-content-date">{details.date}</div>
                    <div className="table-content-view">
                      <Link to={`./${details.view}`} class="fas fa-eye"></Link>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className="footer">
        <MobileNavigationBottom />
      </div>
    </div>
  );
};

export default withRouter(DashBoard);
