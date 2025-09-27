import jwt from 'jsonwebtoken'

export const protect = async (req, res, next) => {
  const authHeader = req.header('Authorization')

  if(!authHeader || !authHeader.startsWith("Bearer")){
    return res.status(401).json({ message: 'no token , authorization denied'})
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    res.status(400).json({ message: 'Token not valid'})
  }
}

export default protect