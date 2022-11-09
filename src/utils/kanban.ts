import { QueryKey, useMutation, useQuery } from 'react-query'
import { Kanban } from 'types/kanban'
import { useHttp } from 'utils/http'
import { useAddConfig } from 'utils/use-optimistic-options'

export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp()
  
  return useQuery<Kanban[]>(['kanbans', param], () => client('kanbans', { data: param }).then((list: Kanban[]) => {
    // 将接口返回的值加上 key 值，否则 table 会有警告信息
    return list.map(item => {
      return {
        ...item,
        key: item.id
      }
    })
  }))
}

export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp()

  return useMutation(
    (params: Partial<Kanban>) => client('kanbans', {
      data: params,
      method: 'POST'
    }),
    useAddConfig(queryKey)
  )
}
