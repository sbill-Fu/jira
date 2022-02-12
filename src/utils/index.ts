import { useEffect, useState } from "react"

export const isFalsy = (value: unknown) => value === 0 ? false : !value

export const cleanObject = (object: object) => {
  const result = {...object}
  Object.keys(result).forEach(key => {
    // @ts-ignore
    const value = result[key]
    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key]
    }
  })
  return result
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
    // eslint-disable-next-line
  }, [])
}

// const debounce = (func, delay) => {
//   let timeout
//   return (...params) => {
//     if (timeout) {
//       clearTimeout(timeout)
//     }
//     timeout = setTimeout(() => {
//       func(...params)
//     }, delay)
//   }
// }

export const useDebounce = <V>(value: V, delay?: number):  V=> {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay)
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debounceValue
}