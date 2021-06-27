module.exports = {
    GetReceipts: async (receiptManager, req, res) => {
        let page = req.params.page ? req.params.page : 0;
        let userId = res.locals.UserAuth.uid;
        let result = await receiptManager.GetReceipts(userId, page);
        res.status(200).send({
            receipts: result
        });
    },
    GetOneReceipt: async (receiptManager, req, res) => {
        let receiptId = req.params.receiptId;
        let userId = res.locals.UserAuth.uid;
        let result = await receiptManager.GetOneReceipt(userId, receiptId);
        if(result){
            res.status(200).send({
                receipts: result
            });
        }else{
            res.status(500).send("Error while getting receipt information");
        }
    },
    CancelReceipt: async (receiptManager, req, res) => {
        let receiptId = req.params.receiptId;
        let userId = res.locals.UserAuth.uid;
        let result = await receiptManager.CancelReceipt(userId, receiptId);
        if(result){
            res.status(200).send({
                receipts: result
            });
        }else{
            res.status(500).send("Error cancelling receipt");
        }
    },
    CreateReceipt: async (receiptManager, contactsManager, req, res) => {
        let userId = res.locals.UserAuth.uid;
        let receiptInfo = req.body.receipt;
        let result = await receiptManager.CreateReceipt(contactsManager, userId, receiptInfo);
        if(result){
            res.status(200).send({
                message: "receipt created successfully",
                receiptId: result
            });
        }else{
            res.status(500).send("Error creating receipt");
        }
    },
}