import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL

function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API}/api/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Producto no encontrado')
        return res.json()
      })
      .then(data => setProduct(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p className="loading">Cargando...</p>
  if (error) return <p className="error">{error}</p>

  return (
    <div className="product-detail">
      <Link to="/" className="back-link">← Volver</Link>
      <div className="detail-content">
        <img src={product.image} alt={product.name} />
        <div className="detail-info">
          <h1>{product.name}</h1>
          <p className="price">{product.price} €</p>
          <span className="badge">{product.category}</span>
          <span className="badge">{product.size}</span>
          <p className="description">{product.description}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
