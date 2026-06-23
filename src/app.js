import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import productsRoutes from './routes/products.routes.js'
import authRoutes from './routes/auth.routes.js'
import notFound from './middlewares/notFound.middleware.js'
import errorHandler from './middlewares/error.middleware.js'

const app = express()

// Middlewares globales
app.use(cors())
app.use(bodyParser.json())

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API de productos funcionando 🚀' })
})

// Rutas de la app
app.use('/api/products', productsRoutes)
app.use('/auth', authRoutes)

// Middleware de rutas no encontradas
app.use(notFound)

// Middleware global de errores
app.use(errorHandler)

export default app
