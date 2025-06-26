// routes/wiki.js
const express = require('express');
const router = express.Router();
const wikiController = require('../controllers/wikiController');

router.get('/search/:searchTerm', wikiController.searchWiki);
router.get('/:urlName', wikiController.getWikiByUrl);
router.post('/', wikiController.createWiki);
router.patch('/:urlName', wikiController.updateWiki);
router.delete('/delete/:urlName', wikiController.deleteWiki);

module.exports = router;
