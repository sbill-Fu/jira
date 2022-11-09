import { useMemo } from 'react'
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'
import { cleanObject } from 'utils'

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
    (params: Partial<{[key in K]: unknown}>) => {
      const o = cleanObject({...Object.fromEntries(searchParams), ...params}) as URLSearchParamsInit
      return setSearchParams(o)
    }
  ] as const
}

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParam] = useSearchParams()
  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit
    return setSearchParam(o)
  }
}
