import { useEffect, useState } from 'react'
import { Box, Typography, IconButton, Button } from '@mui/material'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import UserAddModal from '@features/UserComponents/UserAddModal'
import UserEditModal from '@features/UserComponents/UserEditModal'
import SectionHeader from '@shared/SectionTitle'
import ConfirmationModal from '@shared/ConfirmationModal'
import { useToast } from 'contexts/toast.context'
import { TranslatedUserStatuses } from '@utils/User/constants'
import { getAllUsers, removeUser } from 'services/users.service'
import { IUser } from 'types/user.types'

import styles from './styles.module.scss'

const UserSettingsPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isAdd, setIsAdd] = useState(false)
  const [editUser, setEditUser] = useState<IUser | null>(null)
  const [users, setUsers] = useState<IUser[]>([])

  const { showToast } = useToast()

  const getUsers = async () => {
    const data = await getAllUsers()

    if (data.success) {
      setUsers(data.data)
    }
  }

  const handleEdit = (user: IUser) => {
    setIsEdit(true)
    setEditUser(user)
  }

  const onDelete = (user: IUser) => {
    setEditUser(user)
    setIsOpen(true)
  }

  const handleRemove = async () => {
    if (editUser) {
      const data = await removeUser(editUser?.id)

      if (data.success) {
        showToast('success', data.message)
        setIsOpen(false)
        setUsers(users.filter(({ id }) => id !== editUser.id))
        setEditUser(null)
      }
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <Box className={styles.settingsPage}>
      <SectionHeader title="Կարգավորումներ" />
      <Box className={styles.users}>
        {users.map((user) => (
          <Box className={styles.userContainer} key={user.id}>
            <Box className={styles.info}>
              <Typography>{user.fullName}</Typography>
              <Typography>
                {TranslatedUserStatuses[user.status].label}
              </Typography>
            </Box>
            <Box className={styles.actions}>
              <IconButton onClick={() => handleEdit(user)}>
                <ModeEditOutlineOutlinedIcon />
              </IconButton>
              <IconButton onClick={() => onDelete(user)}>
                <DeleteOutlineOutlinedIcon sx={{ color: '#f96666' }} />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>
      <Button className={styles.addBtn} onClick={() => setIsAdd(true)}>
        Ավելացնել
      </Button>
      {isOpen && (
        <ConfirmationModal
          btnText="Հեռացնել"
          onClose={() => setIsOpen(false)}
          text="Օգտատերի հեռացում"
          onConfirm={handleRemove}
        />
      )}
      {editUser && isEdit && (
        <UserEditModal
          users={users}
          onClose={() => setIsEdit(false)}
          userData={editUser}
          setUsers={setUsers}
        />
      )}
      {isAdd && (
        <UserAddModal
          onClose={() => setIsAdd(false)}
          users={users}
          setUsers={setUsers}
        />
      )}
    </Box>
  )
}

export default UserSettingsPage
