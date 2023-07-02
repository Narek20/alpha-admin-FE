import { OrderTableKeysType } from 'types/order.types'

export const OrderTableColumns = [
  'Համարը',
  'Պատվիրատու',
  'Հեռախոսահամար',
  'Ապրանքը',
  'Տիպը',
  'Հասցեն',
  'Ստեղծման օրը',
  'Քանակը',
  'Պահեստ',
  'Գինը',
  'Կարգավիճակը',
  'Գործողություններ',
]

export const OrderTableKeys = [
  OrderTableKeysType.ID,
  OrderTableKeysType.CUSTOMER_NAME,
  OrderTableKeysType.CUSTOMER_PHONE,
  OrderTableKeysType.TITLE,
  OrderTableKeysType.CATEGORY,
  OrderTableKeysType.ADDRESS,
  OrderTableKeysType.CREATED_AT,
  OrderTableKeysType.QUANTITY,
  OrderTableKeysType.STORAGE,
  OrderTableKeysType.PRICE,
]
