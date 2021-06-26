import React from 'react'
import Heading from "../../Components/heading/heading";

function newdirectmail() {
    return (
        // Heading component 
        /* Containing props of "value" which is text of of heading and a "tooltip"   */
        <div>
          <Heading value="New Direct Mail"  tooltip="Send direct mail to a person or group with a schedule features "/> 
        </div>
    )
}

export default newdirectmail;
