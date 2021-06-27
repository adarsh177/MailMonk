import axios from 'axios';
import firebase from 'firebase';

const ContactAPIs = {
    GetContact: async (groupId) => {
        let auth = 'Bearer: ' + (await firebase.auth().currentUser.getIdToken());
        try{
            let response = await axios.get(`${endpoint}/contacts/${groupId}`, {
                headers: {
                    "Authorization": auth
                }
            });
            if(response.status == 200)
                return response.data['receipts'];
            else return [];
        }catch(ex){
            if(ex.response && ex.response.status == 401){
                return false;
            }
            console.log('Error getting receipts', ex.response);
            return [];
        }
    },
    GetReceiptInfo: async (receiptId) => {
        let auth = 'Bearer: ' + (await firebase.auth().currentUser.getIdToken());
        try{
            let response = await axios.get(`${endpoint}/receipts/single/${receiptId}`, {
                headers: {
                    "Authorization": auth
                }
            });
            if(response.status == 200)
                return response.data['receipts'];
            else
                return {};
        }catch(ex){
            if(ex.response && ex.response.status == 401){
                return null;
            }
            console.log('Error getting receipt info', ex.response);
            return {};
        }
    },
    CancelReceipt: async (receiptId) => {
        let auth = 'Bearer: ' + (await firebase.auth().currentUser.getIdToken());
        try{
            let response = await axios.put(`${endpoint}/receipts/cancel/${receiptId}`, {}, {
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
            console.log('Error cancelling receipts', ex.response);
            return false;
        }
    },
    NewReceipt: async (data) => {
        let auth = 'Bearer: ' + (await firebase.auth().currentUser.getIdToken());
        try{
            let response = await axios.post(`${endpoint}/receipts/cancel/${receiptId}`, data, {
                headers: {
                    "Authorization": auth
                }
            });

            if(response.status == 200)
                return response.data.receiptId;
            else return false;
        }catch(ex){
            if(ex.response && ex.response.status == 401){
                return null;
            }
            console.log('Error adding receipt', ex.response);
            return false;
        }
    },
}

export default ContactAPIs;
