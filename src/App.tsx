import { Box } from '@mui/material'
import Routers from './routes/index'
import Header from '@features/Header'
import './index.css'

const App = () => {
  return (
    <Box className="App">
      <Header />
      <Box className="pages">
        <Routers />
      </Box>
    </Box>
  )
}

export default App
