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
import { updateUser } from 'services/users.service'
import { TranslatedUserStatuses, getUserStatusKey } from '@utils/User/constants'

import styles from './styles.module.scss'

interface IProps {
  open: boolean
  onClose: () => void
  userData: IUser
  users: IUser[]
  setUsers: Dispatch<SetStateAction<IUser[]>>
}

const UserEditModal: FC<IProps> = ({
  open,
  userData,
  users,
  setUsers,
  onClose,
}) => {
  const [phone, setPhone] = useState(userData.phone)
  const [fullName, setFullName] = useState(userData.fullName)
  const [status, setStatus] = useState(TranslatedUserStatuses[userData.status])

  const { showToast } = useToast()

  const handleConfirm = async () => {
    const data = await updateUser({
      id: userData.id,
      phone,
      fullName,
      status: status.key,
    } as IUser)

    if (data.success) {
      showToast('success', data.message)
      setUsers(
        users.map((user) => (user.id === userData.id ? data.data : user))
      )
      onClose()
    }
  }

  return (
    <Modal className={styles.modal} open={open} onClose={onClose}>
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
            defaultValue={userData.phone}
            onChange={(evt) => setPhone(evt.target.value)}
            label="Հեռախոս"
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
              {Object.values(TranslatedUserStatuses).map(({key, label}) => (
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
