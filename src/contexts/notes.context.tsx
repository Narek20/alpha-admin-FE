import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react'
import { getAllNotes } from 'services/notes.service'
import { INotes, INotesContext } from 'types/notes.types'

// Create a DriverContext
export const NotesContext = createContext<INotesContext>({
  notes: [],
  isLoading: false,
  getNotes: () => {},
  setNotes: () => {},
})

// Custom hook to access the DriverContext
export const useNotes = () => useContext(NotesContext)

// NotesProvider component that wraps your app
export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<INotes[] | []>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getNotes = async () => {
    setIsLoading(true)
    const data = await getAllNotes()

    if (data.success) {
      setNotes([...data.data])
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getNotes()
  }, [])

  return (
    <NotesContext.Provider
      value={{ notes, isLoading, getNotes, setNotes }}
    >
      {children}
    </NotesContext.Provider>
  )
}
