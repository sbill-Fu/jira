import { QueryKey, useMutation, useQuery } from 'react-query'
import { Task } from 'types/task'
import { useHttp } from 'utils/http'
import { useAddConfig } from 'utils/use-optimistic-options'

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp()
  
  return useQuery<Task[]>(['tasks', param], () => client('tasks', { data: param }).then((list: Task[]) => {
    // 将接口返回的值加上 key 值，否则 table 会有警告信息
    return list.map(item => {
      return {
        ...item,
        key: item.id
      }
    })
  }))
}

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp()

  return useMutation(
    (params: Partial<Task>) => client('tasks', {
      data: params,
      method: 'POST'
    }),
    useAddConfig(queryKey)
  )
}
