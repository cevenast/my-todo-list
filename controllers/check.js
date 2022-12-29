const Note = require('../models/Note')

module.exports = {
    markItem: async (req,res) => {
        await Note.updateOne(
           {_id:req.body.id},
           {$set: {completed: true}},
           {upsert:false})
       console.log(`id: ${req.body.id} ${req.body.itemName} Marked Complete`)
       res.json('Marked Complete')
       },
    
    unmarkItem: async (req,res) => {
        await Note.updateOne(
           {_id:req.body.id},
           {$set: {completed: false}},
           {upsert:false})
       console.log(`id: ${req.body.id} ${req.body.itemName} unmarked`)
       res.json('Unmarked Complete')
       }
}