import { useEffect, useState } from 'react'

export const isFalsy = (value: unknown) => value === 0 ? false : !value

/**
 * @param {Object} object 
 * 对象上键的值为空的话，就删掉该 key
 */
export const cleanObject = (object: object) => {
  const result = {...object}
  Reflect.ownKeys(result).forEach(key => {
    // @ts-ignore
    const value = result[key]
    if (isFalsy(value)) Reflect.deleteProperty(result, key)
  })
  return result
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
  }, [])
}

export const useDebounce = (value: unknown, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value)
  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay)
    return () => clearTimeout(timeout)
  }, [value, delay])
  return debounceValue
}
