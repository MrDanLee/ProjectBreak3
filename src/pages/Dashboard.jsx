import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const API = import.meta.env.VITE_API_URL

function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    fetch(`${API}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => setError('Error al cargar productos'))
      .finally(() => setLoading(false))
  }, [user, navigate])

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este producto?')) return
    try {
      const res = await fetch(`${API}/api/products/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      setProducts(products.filter(p => p._id !== id))
    } catch {
      alert('Error al eliminar')
    }
  }

  if (!user) return null
  if (loading) return <p className="loading">Cargando...</p>
  if (error) return <p className="error">{error}</p>

  return (
    <div>
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <Link to="/dashboard/new" className="btn">+ Nuevo Producto</Link>
      </div>
      <table className="product-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Talla</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id}>
              <td><img src={p.image} alt={p.name} className="table-img" /></td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.size}</td>
              <td>{p.price} €</td>
              <td>
                <Link to={`/dashboard/edit/${p._id}`} className="btn btn-small">Editar</Link>
                <button onClick={() => handleDelete(p._id)} className="btn btn-small btn-danger">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Dashboard
