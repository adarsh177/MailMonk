module.exports = {
    GetContacts: async(contactManager, req, res) => {
        let groupId = req.params.groupId;
        let results = await contactManager.GetContact(res.locals.UserAuth.uid, groupId);
        res.status(200).send({
            groupId: groupId,
            contacts: results
        });
    },
    DeleteContact: async(contactManager, req, res) => {
        let groupId = req.params.groupId;
        if(!req.body.email){
            res.status(400).send("Provide an email to delete");
            return;
        }
        await contactManager.RemoveContact(res.locals.UserAuth.uid, req.body.email, groupId);
        res.status(200).send("Success");
    },
    AddContact: async(contactManager, req, res) => {
        let contacts = req.body.contacts;
        let groupId = req.params.groupId;
        if(!contacts || !groupId){
            res.status(400).send("Contacts and groupId should be present");
            return;
        }
        await contactManager.AddContacts(res.locals.UserAuth.uid, contacts, groupId);
        res.status(200).send("Success");
    },
    AddGroup: async(contactManager, req, res) => {
        let groupName = req.body.groupName;
        if(!groupName){
            res.status(400).send("groupName should be present");
            return;
        }
        await contactManager.AddGroup(res.locals.UserAuth.uid, groupName);
        res.status(200).send("Success");
    },
    RemoveGroup: async(contactManager, req, res) => {
        let groupId = req.params.groupId;
        if(!groupId){
            res.status(400).send("groupId should be present");
            return;
        }
        await contactManager.RemoveGroup(res.locals.UserAuth.uid, groupId);
        res.status(200).send("Success");
    },
    
}