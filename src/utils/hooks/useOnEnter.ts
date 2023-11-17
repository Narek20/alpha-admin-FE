import { useEffect, useState } from 'react'

const useOnEnter = (callback: () => void) => {
  const [lastKey, setLastKey] = useState('')

  useEffect(() => {
    const onEnter = (evt: KeyboardEvent) => {
      if (evt.key === 'Enter') {
        if (lastKey !== 'Shift') {
          callback()
        }
      }

      setLastKey(evt.key)
    }

    document.addEventListener('keydown', onEnter)

    return () => {
      document.removeEventListener('keydown', onEnter)
    }
  }, [callback])
}

export default useOnEnter
