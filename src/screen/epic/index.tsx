import { Button, List } from 'antd'
import { Row, ScreenContainer } from 'components/lib'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { useEpicSearchParams } from 'screen/epic/util'
import { useProjectInUrl } from 'screen/kanban/util'
import { useEpics } from 'utils/epic'
import { useTasks } from 'utils/task'

export const EpicScreen = () => {
  const {data: currentProject} = useProjectInUrl()
  const {data: epics} = useEpics(useEpicSearchParams())
  const {data: tasks} = useTasks({projectId: currentProject?.id})

  return <ScreenContainer>
    <h1>{currentProject?.name}任务组</h1>
    <List
      dataSource={epics}
      itemLayout='vertical'
      renderItem={epic => <List.Item>
        <List.Item.Meta
          title={<Row between={true}>
            <span>{epic.name}</span>
            <Button type='link'>删除</Button>
          </Row>}
          description={<div>
            <div>开始时间：{dayjs(epic.start).format('YYYY-MM-DD')}</div>
            <div>结束时间：{dayjs(epic.start).format('YYYY-MM-DD')}</div>
          </div>}
        />
        <div>
          {tasks?.filter(task => task.epicId === epic.id).map(task => 
            <Link
              to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}
              key={task.id}
            >
              {task.name}
            </Link>
          )}
        </div>
      </List.Item>}
    />
  </ScreenContainer>
}