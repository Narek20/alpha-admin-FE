import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as RouterProvider } from 'react-router-dom'
import { THEME } from 'styles/MuiTheme'
import { ToastProvider } from 'contexts/toast.context'
import { ThemeProvider } from '@mui/material/styles'
import { AuthProvider } from 'contexts/auth.context'
import { NotesProvider } from 'contexts/notes.context'
import { OrdersProvider } from 'contexts/order.context'
import { StorageProvider } from 'contexts/storage.context'
import { DriversProvider } from 'contexts/driver.context'
import { CategoryProvider } from 'contexts/category.context'
import { ProductsProvider } from 'contexts/products.context'
import '@fontsource/roboto'
import App from './App'
import './services/firebase.service'

import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <RouterProvider>
      <ToastProvider>
        <AuthProvider>
          <ProductsProvider>
            <OrdersProvider>
              <DriversProvider>
                <StorageProvider>
                  <CategoryProvider>
                    <NotesProvider>
                      <ThemeProvider theme={THEME}>
                        <App />
                      </ThemeProvider>
                    </NotesProvider>
                  </CategoryProvider>
                </StorageProvider>
              </DriversProvider>
            </OrdersProvider>
          </ProductsProvider>
        </AuthProvider>
      </ToastProvider>
    </RouterProvider>
  </React.StrictMode>
)
