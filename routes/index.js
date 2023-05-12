const express = require('express');
const router = express.Router();

// Import controllers
const appEngine = require('../engine/engine');

// Engine Routes methods

router.post('/api/classify', appEngine.classify);//return topic classification
router.post('/api/summary', appEngine.summary);//returns a summary
router.post('/api/sentiment', appEngine.sentiment);//return if positive or negative sentiment
router.post('/api/keywords', appEngine.keywords);//returns most important keywords
router.post('/api/sensitivity', appEngine.sensitivity);//returns the sensitivity of the text

module.exports = router;