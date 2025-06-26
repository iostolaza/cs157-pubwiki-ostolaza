
// routes/wiki.js

const express = require('express');
const router = express.Router();
const wikiController = require('../controllers/wikiController');

// Search wiki
router.get('/search/:searchTerm', wikiController.searchWiki);
// Get by urlName
router.get('/:urlName', wikiController.getWikiByUrl);
// Create new wiki
router.post('/', wikiController.createWiki);
// Update wiki
router.patch('/:urlName', wikiController.updateWiki);
// Delete wiki
router.delete('/delete/:urlName', wikiController.deleteWiki);

module.exports = router;
