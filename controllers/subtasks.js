const Note = require('../models/Note')

module.exports = {
    addSubtask: async (req,res) => {
        try{
            await Note.updateOne(
                {_id:req.body.id},
                {$push: {subtasks:req.body.subtask},$set:{hasSubtasks:true}},
                {upsert:false}),

            console.log(`Subtask created for id: ${req.body.id}`)
            res.redirect('/')
        }catch(err){
            console.log('JAJAJAJAJAJA NO CUMPLES CON EL ESQUEMA!!!')
            res.redirect('/')
        }
    },
    
    deleteSubtask: async (req,res) => {
        await Note.updateOne(
           {_id:req.body.id},
           {$set: {
                subtasks: req.body.allSubtasks,
                completedSubtasks: req.body.completedSubtasks
            }},
           {upsert:false})
       console.log(`Subtasks were updated. ${req.body.deletedSubtask} was deleted from ${req.body.id}`)
       res.json('Subtask deleted')
       },

    updateSubtask: async (req,res) => {
        await Note.updateOne(
           {_id:req.body.id},
           {$set: {
            subtasks: req.body.allSubtasks,
            completedSubtasks: req.body.completedSubtasks
        }},
           {upsert:false})
       console.log(`id: ${req.body.id} subtasks updated`)
       res.json('Unmarked Complete')
       }
}