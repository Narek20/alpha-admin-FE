import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as RouterProvider } from 'react-router-dom'
import { THEME } from 'styles/MuiTheme'
import { ToastProvider } from 'contexts/toast.context'
import { ThemeProvider } from '@mui/material/styles';
import { OrdersProvider } from 'contexts/order.context'
import { ProductsProvider } from 'contexts/products.context'
import '@fontsource/roboto'
import App from './App'

import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <RouterProvider>
      <ToastProvider>
        <ProductsProvider>
          <OrdersProvider>
            <ThemeProvider theme={THEME}>
              <App />
            </ThemeProvider>
          </OrdersProvider>
        </ProductsProvider>
      </ToastProvider>
    </RouterProvider>
  </React.StrictMode>
)
