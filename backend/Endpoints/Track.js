module.exports = {
    TrackIt: async (trackManager, req, res, logoData) => {
        let receiptId = req.params.trackId.replace('.png', '');
        await trackManager.AddTrack(receiptId);
        res.setHeader("cache-control", "no-cache");
        res.setHeader("content-type", "image/png")

        res.status(200).send(logoData);
    }
}