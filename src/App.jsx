import { Routes, Route, Link } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProductForm from './pages/ProductForm'

function App() {
  const { user, logout } = useAuth()

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="nav-brand">Tienda de Ropa</Link>
        <div className="nav-links">
          <Link to="/">Productos</Link>
          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button onClick={logout} className="btn-logout">Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </nav>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/new" element={<ProductForm />} />
          <Route path="/dashboard/edit/:id" element={<ProductForm />} />
        </Routes>
      </main>
    </>
  )
}

export default App
