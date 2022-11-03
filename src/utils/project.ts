import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Project } from 'screen/project-list/list'
import { useHttp } from 'utils/http'


export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()
  
  return useQuery<Project[]>(['projects', param], () => client('projects', { data: param }).then((list: Project[]) => {
    // 将接口返回的值加上 key 值，否则 table 会有警告信息
    return list.map(item => {
      return {
        ...item,
        key: item.id
      }
    })
  }))
}

export const useEditProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()
  return useMutation(
    (params: Partial<Project>) => client(`projects/${params.id}`, {
      data: params,
      method: 'PATCH'
    }),
    {
      onSuccess: () => queryClient.invalidateQueries('projects')
    }
  )
}

export const useAddProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()

  return useMutation(
    (params: Partial<Project>) => client(`projects`, {
      data: params,
      method: 'POST'
    }),
    {
      onSuccess: () => queryClient.invalidateQueries('projects')
    }
  )
}

export const useProject = (id?: number) => {
  const client = useHttp()
  return useQuery<Project>(
    ['project', {id}],
    () => client(`projects/${id}`),
    {
      enabled: !!id
    }
  )
}
