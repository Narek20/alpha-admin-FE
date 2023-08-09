import {
  OrderStatus,
  OrderTableKeysType,
  PaymentMethods,
} from 'types/order.types'
import POSSvg from '@assets/SVG/POS.svg'
import cashSvg from '@assets/SVG/cash.svg'
import paidPng from '@assets/SVG/paid.png'

export const OrderTableColumns = [
  'Համարը',
  'Պատվիրատու',
  'Հեռախոս',
  'Հասցե',
  'Հասցե2',
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
  { label: 'Հասցե2', key: OrderTableKeysType.ADDRESS2 },
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
      return '#FF00FE'
    case OrderStatus.DELIVERY:
      return '#FFFD02'
    case OrderStatus.COMPLETED:
      return '#B7B7B7'
    default:
      return '#FE9901'
  }
}

export const getOrderIcon = (paymentMethods: PaymentMethods) => {
  switch (paymentMethods) {
    case PaymentMethods.CASH:
      return cashSvg
    case PaymentMethods.NON_CASH:
      return POSSvg
    default:
      return paidPng
  }
}
