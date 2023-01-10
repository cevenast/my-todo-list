const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home') 

// add specific reoutes for specific tasks

router.get('/', homeController.getIndex)                // Handles initial GET request for the homepage


module.exports = router