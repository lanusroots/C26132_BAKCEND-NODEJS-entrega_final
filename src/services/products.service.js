import productsModel from '../models/products.model.js'
import ApiError from '../utils/ApiError.js'

const getAllProducts = async () => {
  return await productsModel.getAll()
}

const getProductById = async (id) => {
  const product = await productsModel.getById(id)
  if (!product) {
    throw new ApiError(404, `Producto con id ${id} no encontrado`)
  }
  return product
}

const createProduct = async (productData) => {
  const { name, price, stock, category } = productData

  if (!name || price === undefined || stock === undefined || !category) {
    throw new ApiError(400, 'Los campos name, price, stock y category son obligatorios')
  }
  if (typeof price !== 'number' || typeof stock !== 'number') {
    throw new ApiError(400, 'price y stock deben ser números')
  }

  return await productsModel.create({ name, price, stock, category })
}

const updateProduct = async (id, productData) => {
  const updated = await productsModel.update(id, productData)
  if (!updated) {
    throw new ApiError(404, `Producto con id ${id} no encontrado`)
  }
  return updated
}

const deleteProduct = async (id) => {
  const deleted = await productsModel.remove(id)
  if (!deleted) {
    throw new ApiError(404, `Producto con id ${id} no encontrado`)
  }
  return deleted
}

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
}
