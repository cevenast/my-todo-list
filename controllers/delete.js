const Note = require('../models/Note')

module.exports = {
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