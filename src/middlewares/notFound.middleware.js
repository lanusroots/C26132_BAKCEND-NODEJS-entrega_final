const notFound = (req, res, next) => {
  res.status(404).json({
    error: 'NotFound',
    message: `La ruta ${req.method} ${req.originalUrl} no existe`,
  })
}

export default notFound
