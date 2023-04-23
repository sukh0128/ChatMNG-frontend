import { useRef, useState, useEffect, useCallback } from 'react'

export const useElementRects = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [y, setY] = useState(0)
  const [top, setTop] = useState(0)
  const handleNavigation = useCallback(
    e => {
      const window = e.currentTarget
      setTop(ref.current?.getBoundingClientRect().top || 0)
      setY(window.scrollY)
    },
    [y]
  )
  useEffect(() => {
    window.addEventListener('scroll', e => handleNavigation(e))
    return () => {
      // return a cleanup function to unregister our function since its gonna run multiple times
      window.removeEventListener('scroll', e => handleNavigation(e))
    }
  }, [y])

  return { ref, top }
}
