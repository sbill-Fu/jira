import { useCallback, useMemo } from 'react'
import { useLocation } from 'react-router'
import { useDebounce } from 'utils'
import { useProject } from 'utils/project'
import { useTask } from 'utils/task'
import { useUrlQueryParam } from 'utils/url'

export const useProjectIdInUrl = () => {
  const {pathname} = useLocation()
  const id = pathname.match(/projects\/(\d+)/)?.[1]
  return Number(id)
}

export const useProjectInUrl = () => useProject(useProjectIdInUrl())

export const useKanbanSearchParams = () => ({projectId: useProjectIdInUrl()})

export const useKanbansQueryKey = () => ['kanbans', useKanbanSearchParams()]

export const useTaskSearchParams = () => {
  const [param, setParam] = useUrlQueryParam([
    'name',
    'typeId',
    'processorId',
    'tagId'
  ])
  const projectId = useProjectIdInUrl()
  // const debouncedName = useDebounce(param.name)
  return useMemo(() => ({
    projectId,
    typeId: Number(param.typeId) || undefined,
    processorId: Number(param.processorId) || undefined,
    tagId: Number(param.typeId) || undefined,
    name: param.name
  }), [projectId, param])
}

export const useTasksQueryKey = () => ['tasks', useTaskSearchParams()]

export const useTaskModal = () => {
  const [{editingTaskId}, setEditingTaskId] = useUrlQueryParam(['editingTaskId'])
  const {data: editingTask, isLoading} = useTask(Number(editingTaskId))
  const startEdit = useCallback((id: number) =>{
    setEditingTaskId({editingTaskId: id})
  }, [setEditingTaskId])

  const close = useCallback(() => {
    setEditingTaskId({editingTaskId: ''})
  }, [setEditingTaskId])

  return {
    editingTaskId,
    editingTask,
    startEdit,
    close,
    isLoading
  }
}