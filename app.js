require('dotenv').config();
require('./db/db');
const express = require('express');
const port = process.env.PORT || 3000;
const thumbnailsRouter = require('./routers/thumbnails');
const jobStatusRouter = require('./routers/jobStatus');
const fetchThumbnailRouter = require('./routers/fetchThumbnail');
const listJobsRouter = require('./routers/listJobs');

const app = express();

app.use(express.json());

app.use('/job-status', jobStatusRouter);
app.use('/fetch-thumbnail', fetchThumbnailRouter);
app.use('/list-jobs', listJobsRouter);
app.use('/thumbnails', thumbnailsRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  