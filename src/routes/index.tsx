import { Routes, Route } from 'react-router'
import Home from 'pages/Home'
import OrdersPage from 'pages/Orders'
import ProductsPage from 'pages/Products'
import AnalyticsPage from 'pages/Analytics'
import { analyticsSections } from '@utils/analytics/constants'

const Routers = () => {
  return (
    <Routes>
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
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
