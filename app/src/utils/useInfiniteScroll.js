import { useEffect, useCallback } from "react"

const useInfiniteScroll = (callback, margin = 100) => {
  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop + margin < document.documentElement.offsetHeight) {
      return
    }
    callback()
  }, [callback, margin])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])
}

export default useInfiniteScroll