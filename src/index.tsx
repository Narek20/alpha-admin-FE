import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import { THEME } from 'styles/MuiTheme'
import { OrdersProvider } from 'contexts/order.context'
import { ProductsProvider } from 'contexts/products.context'
import '@fontsource/roboto'

import App from './App'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <RouterProvider>
      <ProductsProvider>
        <OrdersProvider>
          <ThemeProvider theme={THEME}>
            <App />
          </ThemeProvider>
        </OrdersProvider>
      </ProductsProvider>
    </RouterProvider>
  </React.StrictMode>
)
