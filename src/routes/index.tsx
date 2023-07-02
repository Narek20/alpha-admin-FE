import { Routes, Route } from 'react-router'
import Home from 'pages/Home'
import OrdersPage from 'pages/Orders'
import ProductsPage from 'pages/Products'

const Routers = () => {
  return (
    <Routes>
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}

export default Routers
