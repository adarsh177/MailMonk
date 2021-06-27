import React, {useState, useEffect} from "react";
import Add from "../../Components/add/add";
import { Link, withRouter } from "react-router-dom";
import {
  Navigation,
  MobileNavigationTop,
  MobileNavigationBottom,
} from "../../Components/navigation/navigation";
import Heading from "../../Components/heading/heading";
import "./contact.scss";
import Loader from "../../Components/Loader";
import FirebaseUtil from '../../Utils/FirebaseUtil';
import firebase from 'firebase';
import ContactAPIs from "../../APIs/ContactAPIs";


const Contacts = (props) => {
  const firebaseUtil = new FirebaseUtil();
  const [value, setValue] = React.useState(-1);
  const [showLoading, setShowLoading] = useState(true);
  const [currentGroupId, setCurrentGroupid] = useState("");
  const [groups, setGroups] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Checking User
    firebase.auth().onAuthStateChanged(async (user) => {
      if(user == null){
        props.history.push('/login');
        return;
      }
      await LoadData();
      setShowLoading(false);
    });
  }, []);

  async function LoadData(){
    let groups = await ContactAPIs.GetGroups();
    if(groups == null){
      props.history.push('/login');
      return;
    }
    setGroups(groups);
    setCurrentGroupid(groups[0].id);
    LoadContacts(groups[0].id);
  }

  async function AddGroup(){
    let groupName = prompt("Please enter a name for new group");
    if(groupName && groupName.length > 0){
      setShowLoading(true);
      await ContactAPIs.AddGroup(groupName); 
      setGroups([]);
      setContacts([]);
      LoadData();
    }
  }

  async function LoadContacts(groupId){
    setShowLoading(true);
    setContacts([]);
    let contacts = await ContactAPIs.GetContacts(groupId);
    if(contacts == null){
      props.history.push('/login');
      return;
    }
    setContacts(contacts);

    setShowLoading(false);
  }

  async function DeleteGroup(id, name){
    let cnf = window.confirm(`Are you sure you want to delete ${name} ${id} group?`);
    if(cnf){
      setShowLoading(true);
      console.log('delete', await ContactAPIs.DeleteGroup(id));
      setGroups([]);
      setContacts([]);
      LoadData();
    }
  }

  return (
    <div className="contact">
      <Loader show={showLoading} />
      <Navigation />
      <MobileNavigationTop />
      <div className="main">
        <div className="contact-top">
          <Heading
            value="Contacts"
            tooltip="List of pepole and groups to whome mail is to be sent"
          />
          <div className="add-contact-button">
            <Add value="Contact" />
            <Add onClick={() => AddGroup()} value="Add Group" />
          </div>
        </div>

        <div className="tabs">
          {groups.map((group, index) => {
            return (
              <div
                className={`tab-item ${group.id === currentGroupId && "active-btn"}`}
              >
                <span
                  onClick={() => {
                    setCurrentGroupid(group.id);
                    LoadContacts(group.id);
                  }}>
                    {group.name}
                </span>
                <i class="fas fa-trash" style={{color: "maroon", fontSize: "0.6em", marginLeft: "0.5em"}} onClick={() => DeleteGroup(group.id, group.name)}></i>
              </div>
            );
          })}
        </div>

        <div className="contact-details">
          <div className="contact-heading-table">
            <div className="table-content-to">Name</div>
            <div className="table-content-subject">Email</div>
          </div>
          {contacts.map((details) => {
            return (
              <div className={`contact-values-table ${value != -1 && "none"}`}>
                <div className="table-content-to">{details.name}</div>
                <div className="table-content-subject">{details.email}</div>
              </div>
            );
          })}
          {/* {groupData.map((details, index) => {
            if (index === value) {
              return (
                <>
                  {details.lists.map((list) => {
                    return (
                      <div className="contact-values-table">
                        <div className="table-content-to">{list.name}</div>
                        <div className="table-content-subject">
                          {list.email}
                        </div>

                        <div className="table-content-view">
                          <i class="fas fa-trash" onClick={() => {}}></i>
                        </div>
                      </div>
                    );
                  })}
                </>
              );
            }
          })} */}
        </div>
      </div>
      <div className="footer">
        <MobileNavigationBottom />
      </div>
    </div>
  );
};

export default withRouter(Contacts);
