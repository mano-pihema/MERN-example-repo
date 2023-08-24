const express = require('express')
const app = express()

const mongoose = require('mongoose')

const UserModel = require('./models/Users')

const cors = require('cors')

app.use(express.json())
app.use(cors())

//any requests are auto parsed

//mongoose.connect('mongodb+srv://mano:MERN@merncluster.jh9ovsu.mongodb.net/')

mongoose.connect(
  'mongodb+srv://mano:MERN@merncluster.jh9ovsu.mongodb.net/MERNtut?retryWrites=true&w=majority'
)

app.get('/getUsers', (req, res) => {
  UserModel.find({})
    .then((result) => {
      res.json(result)
    })
    .catch((error) => {
      res.json({ error: error })
    })
})

app.post('/addUsers', async (req, res) => {
  try {
    const user = req.body
    const newUser = new UserModel(user)

    await newUser.save()
    res.json(user)
  } catch (error) {
    res.json({ error: error })
  }
})

app.listen(3001, () => {
  console.log('listening on port 3001')
})
