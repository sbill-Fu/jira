import { useEffect, useState } from 'react'

export const isFalsy = (value: unknown) => value === 0 ? false : !value

export const isVoid = (value: unknown) => value === undefined || value === null || value === ''
/**
 * @param {Object} object 
 * 对象上键的值为空的话，就删掉该 key
 */
export const cleanObject = (object: {[key: string]: unknown}) => {
  const result = {...object}
  Reflect.ownKeys(result).forEach(key => {
    const value = result[key as keyof typeof  result]
    // const value = result[key]
    if (isVoid(value)) Reflect.deleteProperty(result, key)
  })
  return result
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
    // eslint-disable-next-line
  }, [])
}

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value)
  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay)
    return () => clearTimeout(timeout)
  }, [value, delay])
  return debounceValue
}
