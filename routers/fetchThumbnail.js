const express = require('express');
const router = express.Router();
const ThumbnailJob = require('../models/thumbnail');

router.get('/:id', async (req, res) => {
 try {
    const job = await ThumbnailJob.findById(req.params.id);
    if (job.status !== 'succeeded') {
        return res.status(400).json({ message: 'Job has not succeeded yet' });
    }
    res.sendFile(job.thumbnailUrl);
 } catch (error) {
    res.status(500).json({ message: error.message });
 }
});

module.exports = router;
