import express from 'express'
import addUser from '../controllers/addUser.js'
import logUser from '../controllers/logUser.js'
import protect from '../Middlewares/protect.js'

const authRouter = express.Router()

authRouter.post('/sign-up', addUser)
authRouter.post('/sign-in', logUser)

//protected route
authRouter.get('/profile', protect, (req, res) => {
  res.json({ message: 'Profile accessed' , user: req.user })
})

export default authRouter