import { useEffect } from 'react'

const useOnEnter = (callback: () => void) => {
  useEffect(() => {
    const onEnter = (evt: KeyboardEvent) => {
      if (evt.key === 'Enter') {
        console.log('Enter')

        callback()
      }
    }
    document.addEventListener('keydown', onEnter)

    return () => {
      document.removeEventListener('keydown', onEnter)
    }
  }, [callback])
}

export default useOnEnter
