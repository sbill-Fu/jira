import { useTaskSearchParams } from 'screen/kanban/util'
import { Kanban } from 'types/kanban'
import { useTasks } from 'utils/task'

export const KanbanColumn = ({kanban}: {kanban: Kanban}) => {
  const { data: allTasks } = useTasks(useTaskSearchParams())
  const tasks = allTasks?.filter(task => task.kanbanId === kanban.id)
  return <div>
    <h3>{kanban.name}</h3>
    {
      tasks?.map(task => <div key={task.id}>
        {task.name}
      </div>)
    }
  </div>
}