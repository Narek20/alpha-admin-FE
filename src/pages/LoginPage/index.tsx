import { useContext, useState } from 'react'
import { Box, TextField, Button } from '@mui/material'
import SectionHeader from '@shared/SectionTitle'
import { userLogin } from 'services/users.service'
import { useToast } from 'contexts/toast.context'
import { AuthContext } from 'contexts/auth.context'
import { UserStatus } from 'types/user.types'

import styles from './styles.module.scss'

const Login = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const { showToast } = useToast()
  const { setUserData } = useContext(AuthContext)

  const handleSubmit = async () => {
    const data = await userLogin(login, password)

    if (data.success) {
      showToast('success', data.message)
      setUserData({
        ...data.data,
        isAdmin: data.data.status === UserStatus.ADMIN,
      })
      localStorage.setItem('token', data.accessToken || '')
    }
  }

  return (
    <Box className={styles.loginPage}>
      <Box className={styles.content}>
        <SectionHeader title="Գրանցում" />
        <TextField
          className={styles.loginInput}
          label="Լոգին"
          onChange={(evt) => setLogin(evt.target.value)}
        />
        <TextField
          className={styles.passwordInput}
          type='password'
          label="Գաղտնաբառ"
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <div id="recaptcha-container"></div>
        <Box>
          <Button
            className={styles.submitBtn}
            id="sign-in-button"
            onClick={handleSubmit}
          >
            Հաստատել
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Login
