const express = require('express');
const router = express.Router();
const SiteController = require('../app/controllers/SiteController');

// newController.index
router.get('/', SiteController.index);
// router.get('/', courseController.index);

module.exports = router;
