import jwt from 'jsonwebtoken'
import ApiError from '../utils/ApiError.js'

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new ApiError(401, 'Token no proporcionado')
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new ApiError(403, 'Token expirado')
    }
    throw new ApiError(403, 'Token inválido')
  }
}

export default verifyToken
