const Note = require('../models/Note')

module.exports = {
    getTodos: async (req, res) => {
        try{
            const items = await Note.find()
            res.render('todos.ejs',{info: items})
        }catch(err){
            if (err) return res.status(500).send(err)
        }
    },
    createTask: async (req,res) => {
        try{
            await Note.create({todoItem:req.body.todoItem, completed:false, deleted:false, hasSubtasks:false, subtasks:[]})
            console.log(`${req.body.todoItem} Item has been created`)
            res.redirect('/todos/')
        }catch(err){
            console.log('JAJAJAJAJAJA NO CUMPLES CON EL ESQUEMA!!!')
            res.redirect('/todos/')
        }
    },

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
       },

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