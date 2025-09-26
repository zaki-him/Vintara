import User from "../Modules/user.js"
import generateToken from "./tokenGenerator.js"

// POST /sign-up
const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if(!name || !email || !password){
      return res.status(400).json({ message: 'Please enter all fields' })
    }

    const userExists = await User.findOne({email})

    if(userExists){
      return res.status(400).json({ message: 'User already exists' })
    }

    const newUser = new User({ name, email, password })
    await newUser.save()

    res.status(201).json({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser)
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export default addUser