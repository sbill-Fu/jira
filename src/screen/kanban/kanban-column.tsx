import { useTaskSearchParams } from 'screen/kanban/util'
import { Kanban } from 'types/kanban'
import { useTasks } from 'utils/task'
import taskIcon from 'assets/task.svg'
import bugIcon from 'assets/bug.svg'
import { useTaskTypes } from 'utils/task-type'
import styled from '@emotion/styled'
import { Card } from 'antd'
import { CreateTask } from 'screen/kanban/create-task'

const TaskTypeIcon = ({id}: {id: number}) => {
  const {data: taskTypes} = useTaskTypes()
  const name = taskTypes?.find(taskType => taskType.id === id)?.name
  if (!name) {
    return null
  }
  return <img alt='icon' src={name === 'task' ? taskIcon : bugIcon} style={{width: '1.6rem'}} />
}

export const KanbanColumn = ({kanban}: {kanban: Kanban}) => {
  const { data: allTasks } = useTasks(useTaskSearchParams())
  const tasks = allTasks?.filter(task => task.kanbanId === kanban.id)
  return <Container>
    <h3>{kanban.name}</h3>
    <TaskContainer>
      {
        tasks?.map(task => 
          <Card style={{marginBottom: '0.5rem'}} key={task.id}>
            <div>{task.name}</div>
            <TaskTypeIcon id={task.typeId} />
          </Card>)
      }
      <CreateTask kanbanId={kanban.id} />
    </TaskContainer>
  </Container>
}

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`

const TaskContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`