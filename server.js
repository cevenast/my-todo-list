const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Mongo DB Configuration
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'mytodolist'

async function mongoConnection(){
    const client = await MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    db = client.db(dbName)
    console.log(`Connected to ${dbName} Database`)
}
mongoConnection()
// End of Mongo DB Configuration

app.get('/', async (req, res) => {
    const items = await db.collection(dbName).find().toArray()
    res.render('index.ejs',{info: items})
})

app.post('/postItem', async (req,res) =>{
    await db.collection(dbName).insertOne({todoItem:req.body.todoItem, completed:false, deleted:false})
    console.log(`${req.body.todoItem} Item has been created`)
    res.redirect('/')
})

app.put('/markTask', async (req,res) => {
     await db.collection(dbName).updateOne(
        {todoItem:req.body.todoItem},
        {$set: {completed: true}},
        {upsert:false})
    console.log(`${req.body.todoItem} Marked Complete`)
    res.json('Marked Complete')
    }
)

app.put('/unmarkTask', async (req,res) => {
    await db.collection(dbName).updateOne(
       {todoItem:req.body.todoItem},
       {$set: {completed: false}},
       {upsert:false})
   console.log(`${req.body.todoItem} unmarked`)
   res.json('Marked Complete')
   }
)

app.put('/deleteTask', async (req,res) => {
    await db.collection(dbName).updateOne(
       {todoItem:req.body.todoItem},
       {$set: {deleted: true}},
       {upsert:false,
        sort: {_id: -1},
    })
   console.log(`${req.body.todoItem} Deleted`)
   res.json('Marked Complete')
   }
)

app.listen(PORT, (res,req) =>{
    console.log(`Server is now listening in PORT ${PORT}`)
})