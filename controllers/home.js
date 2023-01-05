const Note = require('../models/Note')

module.exports = {
    getIndex: async (req, res) => {
        try{
            const items = await Note.find()
            res.render('index.ejs',{info: items})
        }catch(err){
            if (err) return res.status(500).send(err)
        }
    },

    createTask: async (req,res) => {
        try{
            await Note.create({todoItem:req.body.todoItem, completed:false, deleted:false, hasSubtasks:false, subtasks:[]})
            console.log(`${req.body.todoItem} Item has been created`)
            res.redirect('/')
        }catch(err){
            console.log('JAJAJAJAJAJA NO CUMPLES CON EL ESQUEMA!!!')
            res.redirect('/')
        }
    }
}