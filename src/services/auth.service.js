import jwt from 'jsonwebtoken'
import ApiError from '../utils/ApiError.js'

const login = async (username, password) => {
  if (!username || !password) {
    throw new ApiError(400, 'Usuario y contraseña son obligatorios')
  }

  const validUser = username === process.env.ADMIN_USERNAME
  const validPassword = password === process.env.ADMIN_PASSWORD

  if (!validUser || !validPassword) {
    throw new ApiError(401, 'Credenciales inválidas')
  }

  const token = jwt.sign(
    { username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
  )

  return { token }
}

export default { login }
