import React from "react";
import Add from "../../Components/add/add";
import { Link } from "react-router-dom";
import {
  Navigation,
  MobileNavigationTop,
  MobileNavigationBottom,
} from "../../Components/navigation/navigation";
import Heading from "../../Components/heading/heading";
import "./contact.scss";
import { contactData, groupData } from "../../Data/mail-contact-data";
const Contacts = () => {
  const [value, setValue] = React.useState(-1);

  return (
    <div className="contact">
      <Navigation />
      <MobileNavigationTop />
      <div className="main">
        <div className="contact-top">
          <Heading
            value="Contacts"
            tooltip="List of pepole and groups to whome mail is to be sent"
          />
          <div className="add-contact-button">
            <Add value="Add Group" />
            <Add value="Contact" />
          </div>
        </div>

        <div className="tabs">
          <div
            className={`tab-item  ${value === -1 && "active-btn"}`}
            onClick={() => {
              setValue(-1);
            }}
          >
            All
          </div>

          {groupData.map((groups, index) => {
            return (
              <div
                className={`tab-item ${index === value && "active-btn"}`}
                onClick={() => {
                  setValue(index);
                }}
              >
                {groups.group}
              </div>
            );
          })}
        </div>

        <div className="contact-details">
          <div className="contact-heading-table">
            <div className="table-content-to">Name</div>
            <div className="table-content-subject">Email</div>
            <div className="table-content-view">Action</div>
          </div>
          {contactData.map((details) => {
            return (
              <div className={`contact-values-table ${value != -1 && "none"}`}>
                <div className="table-content-to">{details.name}</div>
                <div className="table-content-subject">{details.email}</div>

                <div className="table-content-view">
                  <i class="fas fa-trash" onClick={() => {}}></i>
                </div>
              </div>
            );
          })}
          {groupData.map((details, index) => {
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
          })}
        </div>
      </div>
      <div className="footer">
        <MobileNavigationBottom />
      </div>
    </div>
  );
};

export default Contacts;
