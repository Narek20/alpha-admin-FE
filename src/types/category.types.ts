import { Dispatch, SetStateAction } from 'react'

export interface ICategoryContext {
  categories: ICategory[] | []
  isLoading: boolean
  getCategories: () => void
  setCategories: Dispatch<SetStateAction<ICategory[]>>
}

interface IField {
  title: string
}

export interface ICategory {
  title: string
  fields: IField[]
}
