import { QueryKey, useMutation, useQuery } from 'react-query'
import { Epic } from 'types/epic'
import { useHttp } from 'utils/http'
import { useAddConfig, useDeleteConfig } from 'utils/use-optimistic-options'

export const useEpics = (param?: Partial<Epic>) => {
  const client = useHttp()
  
  return useQuery<Epic[]>(['epics', param], () => client('epics', { data: param }).then((list: Epic[]) => {
    // 将接口返回的值加上 key 值，否则 table 会有警告信息
    return list.map(item => {
      return {
        ...item,
        key: item.id
      }
    })
  }))
}

export const useAddEpic = (queryKey: QueryKey) => {
  const client = useHttp()

  return useMutation(
    (params: Partial<Epic>) => client('epics', {
      data: params,
      method: 'POST'
    }),
    useAddConfig(queryKey)
  )
}

export const useDeleteEpic = (queryKey: QueryKey) => {
  const client = useHttp()

  return useMutation(
    (id: number) => client(`epics/${id}`, {
      method: 'DELETE'
    }),
    useDeleteConfig(queryKey)
  )
}
