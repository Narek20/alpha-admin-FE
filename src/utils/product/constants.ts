import { ProductKeys } from 'types/product.types'

export const productStatuses = [
  'Բոլորը',
  'Ավարտված է',
  'Ընդունված է',
  'Առաքվում է',
  'Փաթեթավորվում է',
  'Չեղարկված է',
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
