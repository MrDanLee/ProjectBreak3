import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

const API = 'http://localhost:3000'
const CATEGORIES = ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios']

function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category') || ''

  useEffect(() => {
    setLoading(true)
    setError(null)
    const url = category
      ? `${API}/api/products?category=${category}`
      : `${API}/api/products`
    fetch(url)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => setError('Error al cargar productos'))
      .finally(() => setLoading(false))
  }, [category])

  return (
    <div>
      <h1>Productos</h1>
      <div className="filters">
        <button
          className={!category ? 'active' : ''}
          onClick={() => setSearchParams({})}
        >
          Todos
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={category === cat ? 'active' : ''}
            onClick={() => setSearchParams({ category: cat })}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && <p className="loading">Cargando...</p>}
      {error && <p className="error">{error}</p>}

      <div className="product-grid">
        {products.map(p => (
          <Link to={`/products/${p._id}`} key={p._id} className="product-card">
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p className="price">{p.price} €</p>
            <span className="badge">{p.category}</span>
          </Link>
        ))}
      </div>

      {!loading && !error && products.length === 0 && (
        <p>No hay productos.</p>
      )}
    </div>
  )
}

export default Home
