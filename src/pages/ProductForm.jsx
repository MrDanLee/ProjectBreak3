import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const API = 'http://localhost:3000'
const CATEGORIES = ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios']
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

function ProductForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const isEdit = Boolean(id)

  const [form, setForm] = useState({
    name: '',
    description: '',
    category: 'Camisetas',
    size: 'M',
    price: ''
  })
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    if (isEdit) {
      fetch(`${API}/api/products/${id}`)
        .then(res => res.json())
        .then(data => setForm({
          name: data.name,
          description: data.description,
          category: data.category,
          size: data.size,
          price: data.price
        }))
        .catch(() => setError('Error al cargar producto'))
    }
  }, [id, user, navigate, isEdit])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('description', form.description)
    formData.append('category', form.category)
    formData.append('size', form.size)
    formData.append('price', form.price)
    if (image) formData.append('image', image)

    try {
      const url = isEdit ? `${API}/api/products/${id}` : `${API}/api/products`
      const method = isEdit ? 'PUT' : 'POST'
      const res = await fetch(url, { method, body: formData })
      if (!res.ok) throw new Error('Error al guardar')
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!user) return null

  return (
    <div className="auth-page">
      <h1>{isEdit ? 'Editar Producto' : 'Nuevo Producto'}</h1>
      <form className="form-card" onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}

        <label>Nombre:</label>
        <input name="name" value={form.name} onChange={handleChange} required />

        <label>Descripción:</label>
        <textarea name="description" value={form.description} onChange={handleChange} required />

        <label>Categoría:</label>
        <select name="category" value={form.category} onChange={handleChange}>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <label>Talla:</label>
        <select name="size" value={form.size} onChange={handleChange}>
          {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        <label>Precio:</label>
        <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} required />

        <label>Imagen:{isEdit ? ' (dejar vacío para mantener)' : ''}</label>
        <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} {...(!isEdit && { required: true })} />

        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Guardando...' : (isEdit ? 'Actualizar' : 'Crear')}
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
          Cancelar
        </button>
      </form>
    </div>
  )
}

export default ProductForm
