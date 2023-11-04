const express = require('express');
const router = express.Router();
const ThumbnailJob = require('../models/thumbnail');

router.get('/', async (req, res) => {
 try {
    const jobs = await ThumbnailJob.find({});
    res.json(jobs);
 } catch (error) {
    res.status(500).json({ message: error.message });
 }
});

module.exports = router;
