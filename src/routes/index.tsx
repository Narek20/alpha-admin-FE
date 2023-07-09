import { Routes, Route } from 'react-router'
import Home from 'pages/Home'
import OrdersPage from 'pages/Orders'
import ProductsPage from 'pages/Products'
import AnalyticsPage from 'pages/Analytics'
import NewProductPage from 'pages/NewProductPage'
import { analyticsSections } from '@utils/analytics/constants'

const Routers = () => {
  return (
    <Routes>
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/new-product" element={<NewProductPage />} />
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
