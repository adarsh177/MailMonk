module.exports = {
    TrackIt: async (trackManager, req, res, logoData) => {
        let receiptId = req.query.tid;
        await trackManager.AddTrack(receiptId);
        res.setHeader("cache-control", "no-cache");
        res.setHeader("content-type", "image/png")

        res.status(200).send(logoData);
    }
}