import authService from '../services/auth.service.js'

const login = async (req, res) => {
  const { username, password } = req.body
  const result = await authService.login(username, password)
  res.status(200).json(result)
}

export default { login }
