# Tienda de Ropa - Frontend (React)

Frontend en React para la tienda de ropa. Se conecta al backend API del [projectBreak2](https://github.com/MrDanLee/projectBreak2).

## Instalación

```bash
npm install
```

## Ejecución

1. Asegúrate de que el backend esté corriendo en `http://localhost:3000`
2. Inicia el frontend:

```bash
npm run dev
```

El frontend se abrirá en `http://localhost:5173`.

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run preview` | Preview del build |

## Estructura

```
src/
├── main.jsx              # Entry point
├── App.jsx               # Rutas y navegación
├── index.css             # Estilos globales
├── context/
│   └── AuthContext.jsx   # Contexto de autenticación
└── pages/
    ├── Home.jsx          # Listado de productos con filtros
    ├── ProductDetail.jsx # Detalle de producto
    ├── Login.jsx         # Página de login
    ├── Dashboard.jsx     # Panel admin (CRUD)
    └── ProductForm.jsx   # Crear/editar producto
```

## Endpoints del Backend (API)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/products` | Obtener todos los productos |
| GET | `/api/products?category=X` | Filtrar por categoría |
| GET | `/api/products/:id` | Obtener producto por ID |
| POST | `/api/products` | Crear producto (multipart/form-data) |
| PUT | `/api/products/:id` | Actualizar producto |
| DELETE | `/api/products/:id` | Eliminar producto |
| POST | `/api/login` | Login (JSON: email, password) |
| GET | `/api/logout` | Cerrar sesión |

## Tecnologías

- React 18
- React Router DOM 6
- Vite
- CSS vanilla
