// require('newrelic');

const express = require('express');
const morgan = require('morgan');
const reviewInfoRoutes = require('./controllers/reviewDataConroller/reviewDataController');
const reviewRoutes = require('./controllers/reviewController/reviewController');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('common'));

app.use('/api/reviews/info', reviewInfoRoutes);
app.use('/api/reviews/all', reviewRoutes);

module.exports = app;
