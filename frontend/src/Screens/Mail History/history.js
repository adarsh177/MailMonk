import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import {
    Navigation,
    MobileNavigationTop,
    MobileNavigationBottom,
} from "../../Components/navigation/navigation";
import Heading from "../../Components/heading/heading";
import "./history.scss";
import { historyData } from "../../Data/mail-history-data";
import Loader from "../../Components/Loader";
import FirebaseUtil from '../../Utils/FirebaseUtil';
import firebase from 'firebase';
import ReceiptAPIs from "../../APIs/ReceiptAPIs";

async function loadReceipts(){
    return await ReceiptAPIs.GetReceipts();
}

const History = (props) => {
    const firebaseUtil = new FirebaseUtil();
    const [showLoading, setShowLoading] = useState(true);
    const [receipts, setReceipts] = useState([]);

    useEffect(() => {
        // Checking User
        firebase.auth().onAuthStateChanged(async (user) => {
          if(user == null){
            props.history.push('/login');
          }

          // loading data
          let rctList = await ReceiptAPIs.GetReceipts();
          if(rctList == null){
                // token expired
                props.history.push('/login');
                return;
          }else{
              setReceipts(rctList);
          }
          setShowLoading(false);
        });
      }, []);

  return (
    <div className="history">
        <Loader show={showLoading} />
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

export default withRouter(History);
