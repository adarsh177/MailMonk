import axios from 'axios';
import firebase from 'firebase';

// API ENDPOINT
const endpoint = "http://localhost:3500";

const CampaignAPIs = {
    GetCampaigns: async (page) => {
        if(firebase.auth().currentUser == null) return null;

        let auth = 'Bearer ' + (await firebase.auth().currentUser.getIdToken());
        try{
            let response = await axios.get(`${endpoint}/campaigns/${page}`, {
                headers: {
                    "Authorization": auth
                }
            });
            if(response.status == 200)
                return response.data['campaigns'];
            else return [];
        }catch(ex){
            if(ex.response && ex.response.status == 401){
                return null;
            }

            console.log('Error getting campaigns', ex.response);
            return [];
        }
    },
    GetCampaignInfo: async (campaignId) => {
        if(firebase.auth().currentUser == null) return null;

        let auth = 'Bearer ' + (await firebase.auth().currentUser.getIdToken());
        try{
            let response = await axios.get(`${endpoint}/campaigns/single/${campaignId}`, {
                headers: {
                    "Authorization": auth
                }
            });
            if(response.status == 200)
                return response.data;
            else return {};
        }catch(ex){
            if(ex.response && ex.response.status == 401){
                return null;
            }

            console.log('Error getting campaign info', ex.response);
            return {};
        }
    },
    CancelCampaign: async (campaignId) => {
        if(firebase.auth().currentUser == null) return null;

        let auth = 'Bearer ' + (await firebase.auth().currentUser.getIdToken());
        try{
            let response = await axios.put(`${endpoint}/campaigns/cancel/${campaignId}`, {}, {
                headers: {
                    "Authorization": auth
                }
            });
            if(response.status == 200)
                return true;
            else return false;
        }catch(ex){
            if(ex.response && ex.response.status == 401){
                return null;
            }

            console.log('Error cancelling campaigns', ex.response);
            return false;
        }
    },
    AddCampaign: async (data) => {
        if(firebase.auth().currentUser == null) return null;

        let auth = 'Bearer ' + (await firebase.auth().currentUser.getIdToken());
        try{
            let response = await axios.post(`${endpoint}/campaigns/new`, {
                campaign: data
            }, {
                headers: {
                    "Authorization": auth
                }
            });
            if(response.status == 200)
                return response.data.campaignId;
            else return false;
        }catch(ex){
            if(ex.response && ex.response.status == 401){
                return null;
            }

            console.log('Error adding campaigns', ex.response);
            return false;
        }
    },
}

export default CampaignAPIs;
