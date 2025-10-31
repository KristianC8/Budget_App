import { useEffect, type RefObject } from 'react'

export const useScrollBottom = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dependency: any,
  behavior: ScrollBehavior = 'smooth'
) => {
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
        behavior
      })
    }
  }, [ref, dependency, behavior])
}
