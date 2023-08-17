import { Dispatch, FC, SetStateAction, useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import {
  Box,
  Typography,
  IconButton,
  Button,
  Modal,
  TextField,
} from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { useToast } from 'contexts/toast.context'
import { CustomersContext } from 'contexts/customer.context'
import { CustomerInfoKeys, ICustomer } from 'types/customer.types'
import { customerInformation } from '@utils/customer/constants'
import { updateCustomer } from 'services/customer.service'

import styles from './styles.module.scss'
import { OrdersContext } from 'contexts/order.context'

interface IProps {
  open: boolean
  customer: ICustomer
  onClose: () => void
  setCustomer: Dispatch<SetStateAction<ICustomer | null>>
}

const CustomerEditModal: FC<IProps> = ({
  open,
  customer,
  setCustomer,
  onClose,
}) => {
  const [customerData, setCustomerData] = useState<ICustomer>(customer)

  const { customers, setCustomers } = useContext(CustomersContext)
  const { getOrders } = useContext(OrdersContext)
  const { showToast } = useToast()

  const navigate = useNavigate()

  const handleChange = (key: CustomerInfoKeys, value: string) => {
    setCustomerData({ ...customerData, [key]: value })
  }

  const handleAdd = async () => {
    const data = await updateCustomer(customerData)

    if (data.success) {
      showToast('success', data.message)
      setCustomers(
        customers.map((customer) =>
          customer.id === data.data.id ? data.data : customer,
        ),
      )
      setCustomer(data.data)
      getOrders()
      navigate(`/customers/${data.data.phone}`)
      onClose()
    }
  }

  return (
    <Modal className={styles.modal} open={open} onClose={onClose}>
      <Box className={styles.modalContent}>
        <Box>
          <Box className={styles.header}>
            <Typography className={styles.title}>Փոփոխել</Typography>
            <IconButton onClick={onClose}>
              <CloseOutlinedIcon />
            </IconButton>
          </Box>
          <Box className={styles.content}>
            {customerInformation.slice(0, 7).map(({ key, label }) => (
              <TextField
                key={key}
                value={customerData[key]}
                label={label}
                onChange={(evt) => handleChange(key, evt.target.value)}
              />
            ))}
          </Box>
          <Box className={styles.actions}>
            <Button
              className={styles.addBtn}
              color={'success'}
              onClick={handleAdd}
            >
              Պահպանել
            </Button>
            <Button
              className={styles.cancelBtn}
              color="inherit"
              onClick={onClose}
            >
              Չեղարկել
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default CustomerEditModal
