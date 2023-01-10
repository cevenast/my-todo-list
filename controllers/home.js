const Note = require('../models/Note')

module.exports = {
    getIndex: async (req, res) => {
        try{
            const items = await Note.find()
            res.render('index.ejs',{info: items})
        }catch(err){
            if (err) return res.status(500).send(err)
        }
    }
}