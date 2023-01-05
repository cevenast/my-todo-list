const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home') 
const checkController = require('../controllers/check')
const operationsController = require('../controllers/operations')
const subtasks = require('../controllers/subtasks')

// add specific reoutes for specific tasks

router.get('/', homeController.getIndex)                // Handles initial GET request for the homepage
router.post('/postItem', homeController.createTask)     // Handles POST method request for adding a new task
router.put('/markTask', checkController.markItem)
router.put('/unmarkTask', checkController.unmarkItem)
router.put('/renameTask', operationsController.rename)
router.put('/deleteTask', operationsController.delete)
router.post('/addSubtask', subtasks.addSubtask)


module.exports = router