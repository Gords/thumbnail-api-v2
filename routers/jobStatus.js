const express = require('express');
const router = express.Router();
const ThumbnailJob = require('../models/thumbnail');

router.get('/:id', async (req, res) => {
 try {
     const job = await ThumbnailJob.findById(req.params.id);
     res.json({ status: job.status });
 } catch (error) {
     res.status(500).json({ message: error.message });
 }
});

module.exports = router;
