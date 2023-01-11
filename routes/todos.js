const express = require('express')
const router = express.Router()
const tasksController = require('../controllers/tasks')
const subtasksController = require('../controllers/subtasks')
const { ensureAuth } = require('../middleware/auth')

// add specific reoutes for specific tasks

router.get('/', ensureAuth ,tasksController.getTodos)
router.post('/postItem', tasksController.createTask)     // Handles POST method request for adding a new task
router.put('/markTask', tasksController.markItem)
router.put('/unmarkTask', tasksController.unmarkItem)
router.put('/renameTask', tasksController.rename)
router.put('/deleteTask', tasksController.delete)
router.post('/addSubtask', subtasksController.addSubtask)
router.put('/deleteSubtask', subtasksController.deleteSubtask)
router.put('/updateSubtask', subtasksController.updateSubtask)

module.exports = router