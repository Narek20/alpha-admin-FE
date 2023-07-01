import Home from 'pages/Home'
import ProductsPage from 'pages/Products'
import { Routes, Route } from 'react-router'

const Routers = () => {
  return (
    <Routes>
      <Route path="/products" element={<ProductsPage />} />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}

export default Routers
