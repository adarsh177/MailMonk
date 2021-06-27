import axios from 'axios';
import firebase from 'firebase';

// API ENDPOINT
const endpoint = "https://backendmailmonk.developersmonk.com";

const ContactAPIs = {
    GetGroups: async () => {
        if(firebase.auth().currentUser == null) return null;
        
        let auth = 'Bearer ' + (await firebase.auth().currentUser.getIdToken());
        try{
            let response = await axios.get(`${endpoint}/contacts/groups`, {
                headers: {
                    "Authorization": auth
                }
            });
            if(response.status == 200)
                return response.data['groups'];
            else return [];
        }catch(ex){
            if(ex.response && ex.response.status == 401){
                return null;
            }

            console.log('Error getting groups', ex.response);
            return [];
        }
    },
    GetContacts: async (groupId) => {
        if(firebase.auth().currentUser == null) return null;
        
        let auth = 'Bearer ' + (await firebase.auth().currentUser.getIdToken());
        try{
            let response = await axios.get(`${endpoint}/contacts/group/${groupId}`, {
                headers: {
                    "Authorization": auth
                }
            });
            if(response.status == 200)
                return response.data['contacts'];
            else return [];
        }catch(ex){
            if(ex.response && ex.response.status == 401){
                return false;
            }
            console.log('Error getting contacts', ex.response);
            return [];
        }
    },
    DeleteGroup: async (groupId) => {
        if(firebase.auth().currentUser == null) return null;
        
        let auth = 'Bearer ' + (await firebase.auth().currentUser.getIdToken());
        try{
            let response = await axios.delete(`${endpoint}/contacts/${groupId}`, {
                headers: {
                    "Authorization": auth
                }
            });
            if(response.status == 200)
                return true;
            else
                return false;
        }catch(ex){
            if(ex.response && ex.response.status == 401){
                return null;
            }
            console.log('Error deleting group', ex.response);
            return false;
        }
    },
    AddGroup: async (groupName) => {
        if(firebase.auth().currentUser == null) return null;
        
        let auth = 'Bearer ' + (await firebase.auth().currentUser.getIdToken());
        try{
            let response = await axios.post(`${endpoint}/contacts/addGroup`, {
                groupName: groupName
            }, {
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
            console.log('Error adding group', ex.response);
            return false;
        }
    },
    AddContacts: async (contactsList, groupId) => {
        if(firebase.auth().currentUser == null) return null;
        
        let auth = 'Bearer ' + (await firebase.auth().currentUser.getIdToken());
        try{
            let response = await axios.post(`${endpoint}/contacts/${groupId}`, {
                contacts: contactsList
            }, {
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
            console.log('Error adding contacts in group', ex.response);
            return false;
        }
    },
}

export default ContactAPIs;
