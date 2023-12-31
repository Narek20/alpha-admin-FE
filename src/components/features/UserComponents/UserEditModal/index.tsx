import { Dispatch, FC, SetStateAction, useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Select,
  Modal,
  IconButton,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { IUser } from 'types/user.types'
import { useToast } from 'contexts/toast.context'
import useOnEnter from '@utils/hooks/useOnEnter'
import { updateUser } from 'services/users.service'
import { TranslatedUserStatuses, getUserStatusKey } from '@utils/User/constants'

import styles from './styles.module.scss'

interface IProps {
  onClose: () => void
  userData: IUser
  users: IUser[]
  setUsers: Dispatch<SetStateAction<IUser[]>>
}

const UserEditModal: FC<IProps> = ({ userData, users, setUsers, onClose }) => {
  const [login, setLogin] = useState(userData.login)
  const [password, setPassword] = useState(userData.password)
  const [fullName, setFullName] = useState(userData.fullName)
  const [status, setStatus] = useState(TranslatedUserStatuses[userData.status])

  const { showToast } = useToast()

  const handleConfirm = async () => {
    const data = await updateUser({
      id: userData.id,
      login,
      password,
      fullName,
      status: status.key,
    } as IUser)

    if (data.success) {
      showToast('success', data.message)
      setUsers(
        users.map((user) => (user.id === userData.id ? data.data : user)),
      )
      onClose()
    }
  }

  useOnEnter(handleConfirm)

  return (
    <Modal className={styles.modal} open onClose={onClose}>
      <Box className={styles.modalContent}>
        <Box className={styles.header}>
          <Typography className={styles.title}>Օգտատերի փոփոխում</Typography>
          <IconButton onClick={onClose}>
            <CloseOutlinedIcon />
          </IconButton>
        </Box>
        <Box className={styles.editContainer}>
          <TextField
            className={styles.editInput}
            defaultValue={userData.fullName}
            onChange={(evt) => setFullName(evt.target.value)}
            label="Անուն Ազգանուն"
            variant="outlined"
          />
          <TextField
            className={styles.editInput}
            defaultValue={userData.login}
            onChange={(evt) => setLogin(evt.target.value)}
            label="Լոգին"
            maxRows={5}
            variant="outlined"
          />
          <TextField
            className={styles.editInput}
            defaultValue={userData.password}
            onChange={(evt) => setPassword(evt.target.value)}
            label="Գաղտնաբառ"
            maxRows={5}
            variant="outlined"
          />
          <FormControl>
            <InputLabel id="status">Ստատւս</InputLabel>
            <Select
              className={styles.editInput}
              labelId="status"
              value={status.label}
              onChange={(evt) =>
                setStatus({
                  label: evt.target.value,
                  key: getUserStatusKey(evt.target.value),
                })
              }
              label="Ստատուս"
              maxRows={5}
              variant="outlined"
            >
              {Object.values(TranslatedUserStatuses).map(({ key, label }) => (
                <MenuItem key={key} value={label}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box className={styles.actions}>
          <Button className={styles.removeBtn} onClick={handleConfirm}>
            պահպանել
          </Button>
          <Button className={styles.cancelBtn} color="inherit">
            Չեղարկել
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default UserEditModal
