import { useEffect, useState } from 'react'

export const useScroll = (scrollY?: number) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScrolled = () => {
      if (window.scrollY > (scrollY || 50)) setIsScrolled(true)
      else setIsScrolled(false)
    }

    // Listen `window` events only on the client side.
    // Otherwise it will give error when the page is rendered on the server side
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', onScrolled)

      // Header component will never be detached from the component tree.
      // Not sure if it's necessary to remove listener
      return () => window.removeEventListener('scroll', onScrolled)
    }

    return
  }, [scrollY])

  return isScrolled
}
