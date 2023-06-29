import { Box } from '@mui/material'
import Routers from './routes/index'
import Header from '@features/Header'

const App = () => {
  return (
    <Box>
      <Header />
      <Routers />
    </Box>
  )
}

export default App
