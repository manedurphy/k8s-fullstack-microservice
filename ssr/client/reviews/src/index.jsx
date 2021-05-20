/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import ReactDOM from 'react-dom';
import ReviewsService from './components/ReviewService.jsx';
import './index.scss';

ReactDOM.hydrate(<ReviewsService />, document.getElementById('reviews'));
