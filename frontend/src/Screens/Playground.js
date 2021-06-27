import {useEffect, useState} from 'react';
import firebase from 'firebase';
import FirebaseUtil from '../Utils/FirebaseUtil';
import ContactAPIs from '../APIs/ContactAPIs';
import ReceiptAPIs from '../APIs/ReceiptAPIs';
import CampaignAPIs from '../APIs/CampaignAPIs';
import Loader from '../Components/Loader';

async function runApi(){
    return await CampaignAPIs.GetCampaigns(0);
    // return await CampaignAPIs.GetCampaignInfo("60d850348b4bd40110f5ee8f");
    // return await CampaignAPIs.CancelCampaignInfo("60d850348b4bd40110f5ee8f")
    // return await ReceiptAPIs.GetReceiptInfo("60d84ea21b755d05cd7c63f8");
}

export default function Playground(props){
    const [response, setResponse] = useState("adarsh");
    const firebaseUtil = new FirebaseUtil();

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user)=>{
            console.log('user', user);
            if(user !== null){
                let resp = await runApi();
                console.log('Got response', resp);
                setResponse(JSON.stringify(resp, null, 4));
            }else{
                console.log('User not exists');
            }
        });
    }, []);

    return(
        <div>
            <h1>Resonse Here: </h1>
            <p>{response}</p>
            <Loader show={true} />
        </div>
    )
}