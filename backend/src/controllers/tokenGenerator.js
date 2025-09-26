import jwt from 'jsonwebtoken'

const generateToken = (user) => {
  return jwt.sign({ id: user.id })
}

export default generateToken