import { SetStateAction, Dispatch } from 'react'

export interface INotesContext {
  notes: INotes[]
  isLoading: boolean
  getNotes: () => void
  setNotes: Dispatch<SetStateAction<INotes[]>>
}

export interface INotes {
  id: number
  title: string
  note: string
  date: string
}
