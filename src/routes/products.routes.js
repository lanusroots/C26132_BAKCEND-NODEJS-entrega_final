import { Router } from 'express'
import productsController from '../controllers/products.controller.js'
import verifyToken from '../middlewares/auth.middleware.js'

const router = Router()

router.use(verifyToken); // ← a partir de aquí, todo pide token válido

router.get('/', productsController.getAll)
router.get('/:id', productsController.getById)
router.post('/create', productsController.create)
router.put('/:id', productsController.update)
router.delete('/:id', productsController.remove)

export default router
