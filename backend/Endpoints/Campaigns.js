module.exports = {
    GetAllCampaigns: async (campaignManager, req, res) => {
        let userId = res.locals.UserAuth.uid;
        let campaigns = await campaignManager.GetCampaigns(userId);
        res.status(200).send({
            campaigns: campaigns
        });
    },
    GetCampaignDetails: async (campaignManager, req, res) => {
        let userId = res.locals.UserAuth.uid;
        let campaignId = req.params.campaignId;
        let campaignDetails = await campaignManager.GetCampaignDetails(userId, campaignId);
        if(campaignDetails){
            res.status(200).send(campaignDetails);
        }else{
            res.status(500).send("Error getting campaign Details");
        }
    },
    CancelCampaign:  async (campaignManager, req, res) => {
        let userId = res.locals.UserAuth.uid;
        let campaignId = req.params.campaignId;
        let rslt = await campaignManager.CancelCampaign(userId, campaignId);
        if(rslt){
            res.status(200).send("Successfully cancelled the campaign");
        }else{
            res.status(500).send("Error cancelling campaign");
        }
    },
    NewCampaign:  async (campaignManager, contactManager, req, res) => {
        let userId = res.locals.UserAuth.uid;
        let data = req.body.campaign;
        let newCampaignId = await campaignManager.AddCampaign(contactManager, userId, data);
        if(newCampaignId){
            res.status(200).send({
                msg: "Campaign Created successfully",
                campaignId: newCampaignId
            });
        }else{
            res.status(500).send("Error creating campaign");
        }
    }
}