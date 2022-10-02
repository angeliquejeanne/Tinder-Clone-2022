const PORT = 8000
const express = require('express')
const {MongoClient} = require('mongodb')

const uri = 'mongodb+srv://angelique:S0r3ns3n-@cluster0.lv5itlt.mongodb.net/Cluster0?retryWrites=true&w=majority'

const app = express()

// Default
app.get('/', (req, res) => {
    res.json('Welcome to my app')
})

// Sign up to the Database
app.post('/signup', (req, res) => {
    res.json('Hello to my beauty app')
})

// Get all Users by userIds in the Database
app.get('/users', async (req, res) => {
    const client = new MongoClient(uri)
    // const userIds = JSON.parse(req.query.userIds)

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const returnedUsers = await users.find().toArray()

        res.send(returnedUsers)

    } finally {
        await client.close()
    }
})


app.listen(PORT, () => console.log('Server running on PORT ' + PORT))



