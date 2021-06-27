import axios from 'axios';
import firebase from 'firebase';

// API ENDPOINT
const endpoint = "https://backendmailmonk.developersmonk.com";

const DashboardAPIs = {
    GetDashboard: async () => {
        if(firebase.auth().currentUser == null) return null;
        
        let auth = 'Bearer ' + (await firebase.auth().currentUser.getIdToken());
        try{
            let response = await axios.get(`${endpoint}/dashboard`, {
                headers: {
                    "Authorization": auth
                }
            });
            if(response.status == 200)
                return response;
            else return false;
        }catch(ex){
            if(ex.response && ex.response.status == 401){
                return null;
            }

            console.log('Error getting dashboard', ex.response);
            return false;
        }
    }
}

export default DashboardAPIs;
