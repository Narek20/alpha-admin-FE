import { Routes, Route } from 'react-router'
import Home from 'pages/Home'
import OrderPage from 'pages/OrderPage'
import OrdersPage from 'pages/Orders'
import ProductsPage from 'pages/Products'
import AnalyticsPage from 'pages/Analytics'
import NewProductPage from 'pages/NewProductPage'
import ProductEditPage from 'pages/ProductEditPage'
import { analyticsSections } from '@utils/analytics/constants'
import ProductPage from 'pages/ProductPage'

const Routers = () => {
  return (
    <Routes>
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/orders/:id" element={<OrderPage />} />
      <Route path="products" element={<ProductsPage />}>
        <Route path=":id" element={<ProductPage />} />
      </Route>
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/new-product" element={<NewProductPage />} />
      <Route path="/edit-product/:id" element={<ProductEditPage />} />
      {analyticsSections.map((analyticsSection) => (
        <Route
          key={analyticsSection.title}
          path={analyticsSection.link}
          element={<analyticsSection.component />}
        />
      ))}
      <Route path="*" element={<Home />} />
    </Routes>
  )
}

export default Routers
