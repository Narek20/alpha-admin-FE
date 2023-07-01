import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import { ProductsProvider } from 'contexts/products.context'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <RouterProvider>
      <ProductsProvider>
        <App />
      </ProductsProvider>
    </RouterProvider>
  </React.StrictMode>
)
