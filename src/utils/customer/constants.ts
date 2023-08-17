import { CustomerInfoKeys } from 'types/customer.types'

export const customerInformation = [
  { label: 'Անուն ազգանուն։', key: CustomerInfoKeys.FULL_NAME },
  { label: 'Հեռախոս:', key: CustomerInfoKeys.PHONE },
  { label: 'Հասցե:', key: CustomerInfoKeys.ADDRESS },
  { label: 'Հասցե 2:', key: CustomerInfoKeys.ADDRESS2 },
  { label: 'Նշում:', key: CustomerInfoKeys.NOTES },
  { label: 'Նշում 2:', key: CustomerInfoKeys.NOTES2 },
  { label: 'Քեշբեք(%):', key: CustomerInfoKeys.CASHBACK },
  { label: 'Զեղծված գումարը:', key: CustomerInfoKeys.CASHBACK_MONEY },
  {
    label: 'Ընդհանուր ապրանքները:',
    key: CustomerInfoKeys.TOTAL_QTY,
  },
  {
    label: 'Ընդհանուր գումարը։',
    key: CustomerInfoKeys.TOTAL_PRICE,
  },
]
