const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    todoItem: String,
    completed: Boolean,
    deleted: Boolean,
    hasSubtasks: Boolean,
    subtasks: Array
  })

module.exports = mongoose.model('Note', noteSchema) // Note -> notes Collection