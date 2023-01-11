const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    todoItem: String,
    completed: Boolean,
    deleted: Boolean,
    hasSubtasks: Boolean,
    subtasks: Array,
    completedSubtasks: Array,
    userId: String // this is new
  })

module.exports = mongoose.model('Note', noteSchema) // Note -> notes Collection