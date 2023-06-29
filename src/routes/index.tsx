import Home from 'pages/Home'
import { Routes, Route } from 'react-router'

const Routers = () => {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
    </Routes>
  )
}

export default Routers
