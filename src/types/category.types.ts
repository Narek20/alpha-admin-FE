import { Dispatch, SetStateAction } from 'react'

export interface ICategoryContext {
  categories: ICategory[] | []
  isLoading: boolean
  getCategories: () => void
  setCategories: Dispatch<SetStateAction<ICategory[]>>
}

interface IField {
  title: string
  key: string
}

export interface ICategory {
  id: number
  title: string
  fields: IField[]
}
