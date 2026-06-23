import productsService from '../services/products.service.js'

const getAll = async (req, res) => {
    const products = await productsService.getAllProducts()
    res.status(200).json(products)
}

const getById = async (req, res) => {
    const product = await productsService.getProductById(req.params.id)
    res.status(200).json(product)
}

const create = async (req, res) => {
    const newProduct = await productsService.createProduct(req.body)
    res.status(201).json(newProduct)
}

const update = async (req, res) => {
    const updateProduct = await productsService.updateProduct(req.params.id, req.body)
    res.status(200).json(updateProduct)
}

const remove = async (req, res) => {
    await productsService. deleteProduct(req.params.id)
    res.status(204).send()
}

export default { getAll, getById, create, update, remove }