import { useContext } from 'react'
import { Box } from '@mui/material'
import Routers from './routes/index'
import Header from '@features/Header'
import { AuthContext } from 'contexts/auth.context'
import './index.css'

const App = () => {
  const { userData } = useContext(AuthContext)

  return (
    <Box className="App">
      {userData && <Header />}
      <Box className="pages">
        <Routers />
      </Box>
    </Box>
  )
}

export default App
