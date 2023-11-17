import {
  OrderStatus,
  OrderTableKeysType,
  PaymentMethods,
} from 'types/order.types'
import POSPNG from '@assets/SVG/POS.png'
import cashPng from '@assets/SVG/cash.png'
import paidPng from '@assets/SVG/paid.png'

export const OrderTableColumns = [
  'Համարը',
  'Պատվիրատու',
  'Հեռախոս',
  'Հասցե',
  'Հասցե 2',
  'Նշումներ',
  'Առաքիչ',
  'Ստեղծման օր',
  'Առաքման օր',
  'Ստատուսը',
  'Գործողություններ',
]

export const CustomerOrdersTableColumns = [
  'Համարը',
  'Հասցե',
  'Նշումներ',
  'Առաքիչ',
  'Ստեղծման օր',
  'Առաքման օր',
  'Ստատուսը',
]

export const OrderTableKeys = [
  { label: 'Համար', key: OrderTableKeysType.ID },
  { label: 'Պատվիրատու', key: OrderTableKeysType.FULL_NAME },
  { label: 'Հեռախոս', key: OrderTableKeysType.PHONE },
  { label: 'Հասցե', key: OrderTableKeysType.ADDRESS },
  { label: 'Հասցե 2', key: OrderTableKeysType.ADDRESS2 },
  { label: 'Նշումներ', key: OrderTableKeysType.NOTES },
]

export const CreateOrderKeys = [
  OrderTableKeysType.FULL_NAME,
  OrderTableKeysType.PHONE,
  OrderTableKeysType.ADDRESS,
  OrderTableKeysType.ADDRESS2,
]

export const OrderStatuses = [
  OrderStatus.RECEIVED,
  OrderStatus.PACKING,
  OrderStatus.DELIVERY,
  OrderStatus.COMPLETED,
  OrderStatus.ISSUE,
]

export const paymentMethods = [
  PaymentMethods.PAID,
  PaymentMethods.CASH,
  PaymentMethods.NON_CASH,
]

export const OrderDetailsKeys = [
  {
    label: 'Պատվիրատու',
    key: OrderTableKeysType.FULL_NAME,
  },
  {
    label: 'Հեռախոսահամար',
    key: OrderTableKeysType.PHONE,
  },
  {
    label: 'Հասցե',
    key: OrderTableKeysType.ADDRESS,
  },
  {
    label: 'Հասցե 2',
    key: OrderTableKeysType.ADDRESS2,
  },
  {
    label: 'Առաքիչ',
    key: OrderTableKeysType.DRIVER,
  },
  {
    label: 'Առաքման օրը',
    key: OrderTableKeysType.DELIVERY_DATE,
  },
  {
    label: 'Ստեղծվել է',
    key: OrderTableKeysType.CREATED_AT,
  },
]

export const initialStatusCounts = {
  [OrderStatus.RECEIVED]: 0,
  [OrderStatus.PACKING]: 0,
  [OrderStatus.DELIVERY]: 0,
  [OrderStatus.COMPLETED]: 0,
  [OrderStatus.ISSUE]: 0,
}

export const orderStatusStyles = (status: OrderStatus): string => {
  switch (status) {
    case OrderStatus.ISSUE:
      return 'canceled'
    case OrderStatus.PACKING:
      return 'packing'
    case OrderStatus.DELIVERY:
      return 'delivery'
    case OrderStatus.COMPLETED:
      return 'completed'
    default:
      return 'received'
  }
}

export const orderRowColor = (status: OrderStatus): string => {
  switch (status) {
    case OrderStatus.ISSUE:
      return '#FF0000'
    case OrderStatus.PACKING:
      return '#B7B7B7'
    case OrderStatus.DELIVERY:
      return '#FFFD02'
    case OrderStatus.COMPLETED:
      return 'rgba(0,0,0,0)'
    default:
      return '#FE9901'
  }
}

export const getOrderIcon = (paymentMethods: PaymentMethods) => {
  switch (paymentMethods) {
    case PaymentMethods.CASH:
      return cashPng
    case PaymentMethods.NON_CASH:
      return POSPNG
    default:
      return paidPng
  }
}
