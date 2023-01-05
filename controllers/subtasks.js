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
    
    markSubtask:'',

    unmarkSubtask: async (req,res) => {
        await Note.updateOne(
           {_id:req.body.id},
           {$set: {completed: false}},
           {upsert:false})
       console.log(`id: ${req.body.id} ${req.body.itemName} unmarked`)
       res.json('Unmarked Complete')
       }
}