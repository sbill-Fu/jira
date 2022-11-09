import { useMemo } from 'react'
import { useLocation } from 'react-router'
import { useProject } from 'utils/project'
import { useUrlQueryParam } from 'utils/url'

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation()
  const id = pathname.match(/projects\/(\d+)/)?.[1]
  return Number(id)
}

export const useProjectInUrl = () => useProject(useProjectIdInUrl())

export const useKanbanSearchParams = () => ({projectId: useProjectIdInUrl()})

export const useKanbansQueryKey = () => ['kanbans', useKanbanSearchParams()]

export const useTaskSearchParams = () => {
  const [param] = useUrlQueryParam([
    'name',
    'typeId',
    'processorId',
    'tagId'
  ])
  const projectId = useProjectIdInUrl()
  
  return useMemo(() => ({
    projectId,
    typeId: Number(param.typeId) || undefined,
    name: param.name,
    processorId: Number(param.processorId) || undefined,
    tagId: Number(param.tagId) || undefined
  }), [projectId, param])
}

export const useTasksQueryKey = () => ['tasks', useTaskSearchParams()]
