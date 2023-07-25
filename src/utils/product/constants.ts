import { AdditionalDetailsKeys, ProductKeys } from 'types/product.types'

export const productStatuses = [
  'Բոլորը',
  'Նոր պատվեր',
  'Փաթեթավորվում է',
  'Առաքվում է',
  'Ավարտված',
  'Խնդիր',
]

export const productKeyNames = ['Անվանումը', 'Գույնը']

export const productKeys = [
  ProductKeys.TITLE,
  ProductKeys.BRAND,
  ProductKeys.CATEGORY,
  ProductKeys.COUNTRY,
  ProductKeys.PRICE,
  ProductKeys.PURCHASE_PRICE,
  ProductKeys.NOTES,
  ProductKeys.ADDITIONAL_INFO,
]

export const additionalDetailsKeys = [
  { key: AdditionalDetailsKeys.BRAND, label: 'Բրենդը' },
  { key: AdditionalDetailsKeys.COLOR, label: 'Գույնը' },
  { key: AdditionalDetailsKeys.COUNTRY, label: 'Արտադրված է' },
  { key: AdditionalDetailsKeys.PURCHASE_PRICE, label: 'Առք' },
  { key: AdditionalDetailsKeys.PRICE, label: 'Վաճառք' },
]

export const claspTypes = [
  {
    clasp: 'Առանց ամրացման',
  },
  {
    clasp: 'Քուղեր',
  },
  {
    clasp: 'Սեղմիչ',
  },
  {
    clasp: 'Կոճակներ',
  },
  {
    clasp: 'Մագնիս',
  },
  {
    clasp: 'Կայծակաճարմանդ',
  },
]
