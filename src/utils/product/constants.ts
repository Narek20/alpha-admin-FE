import { AdditionalDetailsKeys, ProductKeys } from 'types/product.types'

export const productStatuses = [
  'Բոլորը',
  'Ավարտված է',
  'Նոր պատվեր',
  'Առաքվում է',
  'Փաթեթավորվում է',
  'Խնդիր',
]

export const productKeyNames = ['Անվանումը', 'Գույնը']

export const productKeys = [
  ProductKeys.TITLE,
  ProductKeys.BRAND,
  ProductKeys.CATEGORY,
  ProductKeys.CLASP,
  ProductKeys.COUNTRY,
  ProductKeys.GENDER,
  ProductKeys.PRICE,
  ProductKeys.SHOES_HEIGHT,
  ProductKeys.SEASON,
  ProductKeys.WEIGHT,
  ProductKeys.PURCHASE_PRICE,
  ProductKeys.NOTES,
]

export const additionalDetailsKeys = [
  { key: AdditionalDetailsKeys.BRAND, label: 'Բրենդը' },
  { key: AdditionalDetailsKeys.SEASON, label: 'Սեզոնը' },
  { key: AdditionalDetailsKeys.GENDER, label: 'Սեռը' },
  { key: AdditionalDetailsKeys.COLOR, label: 'Գույնը' },
  { key: AdditionalDetailsKeys.WEIGHT, label: 'Քաշը' },
  { key: AdditionalDetailsKeys.SHOES_HEIGHT, label: 'Բարձրությունը' },
  { key: AdditionalDetailsKeys.CLASP, label: 'Ամրացման տեսակը' },
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
