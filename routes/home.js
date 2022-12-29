const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home') 
const checkController = require('../controllers/check')
const operationsController = require('../controllers/operations')

// add specific reoutes for specific tasks

router.get('/', homeController.getIndex)                // Handles initial GET request for the homepage
router.post('/postItem', homeController.createTask)     // Handles POST method request for adding a new task
router.put('/markTask', checkController.markItem)
router.put('/unmarkTask', checkController.unmarkItem)
router.put('/renameTask', operationsController.rename)
router.put('/deleteTask', operationsController.delete)


module.exports = router