import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

/**
 * 返回页面 url 中，指定键的参数值
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams()
  return [
    useMemo(
      () => keys.reduce((prev, key) =>  {
        return {...prev, [key]: searchParams.get(key) || ''}
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      {} as { [key in K]: string }), [searchParams]),
    setSearchParams
  ] as const
}

