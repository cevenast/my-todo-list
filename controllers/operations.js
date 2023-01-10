const Note = require('../models/Note')

module.exports = {
    rename: async(req,res) => {
             await Note.updateOne(
                 {_id:req.body.id},
                 {$set:{todoItem:req.body.itemName}},
                 {upsert:false})
             console.log(`id: ${req.body.id} Updated to: ${req.body.itemName}`)
             res.json('Note Renamed')  
         },
    
    delete: async (req,res) => {
            await Note.updateOne(
               {_id:req.body.id},
               {$set: {deleted: true}},
               {upsert:false,
                sort: {_id: -1},
            })
           console.log(`${req.body.id} ${req.body.itemName} Deleted`)
           res.json('Deletion Complete')
           }
}