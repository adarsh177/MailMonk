import React, { useState } from "react";
import "./Selectgroup.css";

function Selectgroup(props) {
    const values = props.target == "to" ? props.valuesTo : (props.target == "cc" ? props.valuesCc : props.valuesBcc);
    const [data, setData] = useState(values);
    const [customText, setCustomText] = useState(values.filter((el) => el.startsWith("mail:")).join(', '));

    function AddToData(entry, add){
        if(add && !data.includes(entry)){
            setData([...data, entry]);
        }

        if(!add){
            setData(data.filter((val) => {
                return val !== entry;
            }));
        }
    }

    function OnSavePressed(){
        let custom = document.getElementById('CustomEmailInput').value;
        let emails = custom.split(',');
        emails.forEach(element => {
            let el = element.trim().replace('\n', '');
            if(el.length > 0)
                data.push(`email:${element}`);
        });
        console.log(data);
        props.onSave(data, props.target);
    }

    
    if(props.target === null) return null;
    return (
        <div className="outer-container">
            <div className="inner-container">
                <h3>{props.head.toUpperCase()}</h3>
                {props.groups.map((grp) => {
                    return(
                        <div className="inner-elements" >
                            <input 
                                type="checkbox" 
                                checked={data.includes(`group:${grp.id}`)}
                                onChange={(change) => AddToData(`group:${grp.id}`, change.target.checked)}
                                />
                            <label>{grp.name}</label>
                        </div>
                    );
                })}
                <div className="inner-elements">
                    <label>Custom (comma seperated)</label>
                </div>
                <div className="inner-elements">
                    <textarea
                        className="textfieldofgroup"
                        name="custom-email-input"
                        type="text"
                        id="CustomEmailInput"
                        value={customText}
                        onChange={(event) => setCustomText(event.target.value)}
                    />
                </div>
                <div className="flex-container justify-center">
                    <button className="form-button space-bw-row " onClick={() => OnSavePressed()}>Save</button>
                </div>
            </div>
        </div>
    );
}

export default Selectgroup;
