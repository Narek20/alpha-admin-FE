import { PaymentMethods } from 'types/order.types'
import { StoreTableKeysType } from 'types/store.types'

export const StoreTableColumns = [
  'Համարը',
  'Պատվիրատու',
  'Հեռախոս',
  'Նշումներ',
  'Ստեղծման օր',
  'Գործողություններ',
]

export const StoreTableKeys = [
  { label: 'Համար', key: StoreTableKeysType.ID },
  { label: 'Պատվիրատու', key: StoreTableKeysType.FULL_NAME },
  { label: 'Հեռախոս', key: StoreTableKeysType.PHONE },
  { label: 'Նշումներ', key: StoreTableKeysType.NOTES },
]

export const CreateStoreKeys = [
  StoreTableKeysType.FULL_NAME,
  StoreTableKeysType.PHONE,
]

export const paymentMethods = [
  PaymentMethods.PAID,
  PaymentMethods.CASH,
  PaymentMethods.NON_CASH,
]

export const StoreDetailsKeys = [
  {
    label: 'Պատվիրատու',
    key: StoreTableKeysType.FULL_NAME,
  },
  {
    label: 'Հեռախոսահամար',
    key: StoreTableKeysType.PHONE,
  },
  {
    label: 'Ստեղծվել է',
    key: StoreTableKeysType.CREATED_AT,
  },
]
