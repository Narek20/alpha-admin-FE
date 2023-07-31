import { useContext } from 'react'
import { Routes, Route } from 'react-router'
import Home from 'pages/Home'
import Login from 'pages/LoginPage'
import Drivers from 'pages/Drivers'
import OrderPage from 'pages/OrderPage'
import OrdersPage from 'pages/Orders'
import LoadingPage from 'pages/LoadingPage'
import ProductPage from 'pages/ProductPage'
import ProductsPage from 'pages/Products'
import CustomerPage from 'pages/CustomerPage'
import AnalyticsPage from 'pages/Analytics'
import NewProductPage from 'pages/NewProductPage'
import ProductEditPage from 'pages/ProductEditPage'
import UserSettingsPage from 'pages/UserSettingsPage'
import { analyticsSections } from '@utils/analytics/constants'
import { AuthContext } from 'contexts/auth.context'
import { UserStatus } from 'types/user.types'

const Routers = () => {
  const { userData, isLoading } = useContext(AuthContext)

  return (
    <Routes>
      {isLoading ? (
        <Route path="*" element={<LoadingPage />} />
      ) : userData ? (
        <>
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:id" element={<OrderPage />} />
          <Route path="products" element={<ProductsPage />}>
            <Route path=":id" element={<ProductPage />} />
          </Route>
          {userData.isAdmin && (
            <>
              <Route path="/settings" element={<UserSettingsPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              {analyticsSections.map((analyticsSection) => (
                <Route
                  key={analyticsSection.title}
                  path={analyticsSection.link}
                  element={<analyticsSection.component />}
                />
              ))}
            </>
          )}
          {userData.status !== UserStatus.USER && (
            <>
              <Route path="/new-product" element={<NewProductPage />} />
              <Route path="/edit-product/:id" element={<ProductEditPage />} />
            </>
          )}

          <Route path="/customers/:fullName" element={<CustomerPage />} />
          <Route path="*" element={<Home />} />
        </>
      ) : (
        <Route path="*" element={<Login />} />
      )}
    </Routes>
  )
}

export default Routers
