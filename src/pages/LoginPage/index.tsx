import { useContext, useState } from 'react'
import { Box, TextField, Button } from '@mui/material'
import SectionHeader from '@shared/SectionTitle'
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from 'firebase/auth'
import { auth } from 'services/firebase.service'
import { getUserByPhoneNumber } from 'services/users.service'
import { useToast } from 'contexts/toast.context'
import { AuthContext } from 'contexts/auth.context'
import { IUser, UserStatus } from 'types/user.types'

import styles from './styles.module.scss'

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isClicked, setIsClicked] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')
  const [optVerifier, setOptVerifier] = useState<ConfirmationResult | null>()
  const [user, setUser] = useState<{ user: IUser; token?: string } | null>(null)

  const { showToast } = useToast()
  const { setUserData } = useContext(AuthContext)

  const handleSubmit = async () => {
    try {
      const data = await getUserByPhoneNumber(phoneNumber)

      if (!data.success) {
        showToast('error', data.message)
        return
      }
      setUser({ user: data.data, token: data.accessToken })

      if (!isClicked) setIsClicked(true)
      else return

      const recaptchaVerifier = new RecaptchaVerifier(
        auth,
        'recaptcha-container',
        {}
      )
      recaptchaVerifier.render()

      const response = await signInWithPhoneNumber(
        auth,
        `+374${phoneNumber.substring(1)}`,
        recaptchaVerifier
      )

      setOptVerifier(response)
    } catch (err) {
      showToast('error', 'Փորձեք մի փոքր ուշ')
    }
  }

  const handleApprove = () => {
    if (optVerifier)
      optVerifier
        .confirm(verificationCode)
        .then(() => {
          if (user && user.token) {
            setUserData({
              ...user.user,
              isAdmin: user.user.status === UserStatus.ADMIN,
            })
            localStorage.setItem('token', user.token)
          }
        })
        .catch(() => {
          showToast('error', 'Սխալ վերիֆիկացիոն կոդ')
        })
  }

  return (
    <Box className={styles.loginPage}>
      <Box className={styles.content}>
        <SectionHeader title="Գրանցում" />
        <TextField
          className={styles.phoneInput}
          label="Հեռախոսը"
          onChange={(evt) => setPhoneNumber(evt.target.value)}
        />
        <div id="recaptcha-container"></div>
        {isClicked && (
          <TextField
            className={styles.phoneInput}
            label="Վերիֆիկացիոն կոդը"
            onChange={(evt) => setVerificationCode(evt.target.value)}
          />
        )}
        <Box>
          <Button
            className={styles.submitBtn}
            id="sign-in-button"
            onClick={handleSubmit}
          >
            Ստանալ SMS
          </Button>
          {isClicked && (
            <Button
              className={styles.submitBtn}
              id="sign-in-button"
              onClick={handleApprove}
            >
              Հաստատել
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default Login
