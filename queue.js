const Queue = require('bull');
const ThumbnailJob = require('./models/thumbnail');
const sharp = require('sharp');
const mongoose = require('mongoose');

// Create a new queue
const thumbnailQueue = new Queue('thumbnail');

// Define your job processing logic
thumbnailQueue.process(async (job, done) => {
    try {
      const { imagePath } = job.data;
      const thumbnailBuffer = await sharp(imagePath).resize(200, 200).toBuffer();
      const thumbnailBase64 = thumbnailBuffer.toString('base64');
      
      // Find the thumbnail job in the database using the imagePath
      const thumbnailJob = await ThumbnailJob.findOne({ imagePath: job.data.imagePath });
      
      // Check if the thumbnailJob is not null
      if (thumbnailJob) {
        // Update the thumbnailUrl and status properties in the database
        thumbnailJob.thumbnailUrl = `data:image/jpeg;base64,${thumbnailBase64}`;
        thumbnailJob.status = 'completed';
        await thumbnailJob.save();
      } else {
        console.error(`ThumbnailJob not found for imagePath: ${job.data.imagePath}`);
      }
      
      done(null, thumbnailBase64);
    } catch (err) {
      console.error(err);
      done(err);
    }
  });
  
  

// Export the thumbnailQueue
module.exports = {
  thumbnailQueue,
};



