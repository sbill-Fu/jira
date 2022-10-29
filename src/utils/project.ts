import { useEffect } from 'react'
import { Project } from 'screen/project-list/list'
import { cleanObject } from 'utils'
import { useHttp } from 'utils/http'
import { useAsync } from 'utils/use-async'


export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()
  const { run, ...result } = useAsync<Project[]>()

  useEffect(() => {
    run(client('projects', {data: cleanObject(param || {})}).then((list: Project[]) => {
      // 将接口返回的值加上 key 值，否则 table 会有警告信息
      return list.map(item => {
        return {
          ...item,
          key: item.id
        }
      })
    }))
    // eslint-disable-next-line
  }, [param])
  return result
}

export const useEditProject = () => {
  const client = useHttp()
  const { run, ...asyncResult } = useAsync<Project[]>()

  const mutate = (params: Partial<Project>) => {
    return run(client(`projects/${params.id}`, {
      data: params,
      method: 'PATCH'
    }))
  }
  return {
    mutate,
    ...asyncResult
  }
}

export const useAddProject = () => {
  const client = useHttp()
  const { run, ...asyncResult } = useAsync<Project[]>()

  const mutate = (params: Partial<Project>) => {
    return run(client(`projects/${params.id}`, {
      data: params,
      method: 'POST'
    }))
  }
  return {
    mutate,
    ...asyncResult
  }
}
