const express = require('express')
const cors = require('cors')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Simple JWT server is Running')
})

app.post('/login', (req, res) => {
  const user = req.body
  console.log(user)
  //DANGER: Do not check password here for serious application
  // USE proper process for hashing and checking
  // AFTER completing all authentication related verfication , issue JWT token
  if (user.email === 'user@gmail.com' && user.password === '123456') {
    const accessToken = jwt.sign(
      { email: user.email },
      process.env.ACCESS_TOKE_SECRET,
      { expiresIn: '1d' }
    )
    res.send({ success: true, accessToken: accessToken })
  } else {
    res.send({ success: false })
  }
})

app.listen(port, () =>
  console.log('Simple JWT server is Running on port, ', port)
)
