
// controllers/wikiController.js

const { Wiki } = require('../config/database');
const categories = require('../config/categories');

// Controller to return categories
exports.getCategories = (req, res) => {
  res.json(categories);
};

// Controller to handle search
exports.searchWiki = async (req, res) => {
  try {
    const filterObj = {
      $or: [
        { title: { $regex: req.params.searchTerm, $options: 'i' } },
        { html: { $regex: req.params.searchTerm, $options: 'i' } },
      ],
    };
    const result = await Wiki.find(filterObj).exec();
    res.json(result);
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to handle retrieving a single wiki page
exports.getWikiByUrl = async (req, res) => {
  try {
    const wiki = await Wiki.findOne({ urlName: req.params.urlName }).exec();
    if (wiki) {
      wiki.pageViews++;
      await wiki.save();
      res.json({
        title: wiki.title,
        html: wiki.html,
        author: wiki.author,
        category: wiki.category,
        pageViews: wiki.pageViews,
        createdDate: wiki.createdDate,
        updatedDate: wiki.updatedDate
      });
    } else {
      res.status(404).send('Wiki Page Not Found');
    }
  } catch (error) {
    console.error('Error fetching wiki page:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to handle creating a new wiki page
exports.createWiki = async (req, res) => {
  try {
    const newWiki = new Wiki(req.body);
    const result = await newWiki.save();
    res.json(result);
  } catch (error) {
    console.error('Error creating new wiki:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to handle updating a wiki page
exports.updateWiki = async (req, res) => {
  try {
    const existingWiki = await Wiki.findOne({ urlName: req.params.urlName }).exec();
    if (existingWiki && existingWiki.password === req.body.password) {
      Object.assign(existingWiki, req.body); // Update fields
      existingWiki.updatedDate = new Date();
      const result = await existingWiki.save();
      res.json(result);
    } else {
      res.status(403).json({ error: 'Invalid password or wiki not found' });
    }
  } catch (error) {
    console.error('Error updating wiki:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to handle deleting a wiki page
exports.deleteWiki = async (req, res) => {
  try {
    const existingWiki = await Wiki.findOne({ urlName: req.params.urlName }).exec();
    if (existingWiki && existingWiki.password === req.body.password) {
      await Wiki.findByIdAndDelete(existingWiki._id);
      res.json({ message: 'Wiki deleted successfully' });
    } else {
      res.status(403).json({ error: 'Invalid password or wiki not found' });
    }
  } catch (error) {
    console.error('Error deleting wiki:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
