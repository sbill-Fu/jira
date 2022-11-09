import styled from '@emotion/styled'
import { Spin } from 'antd'
import { ScreenContainer } from 'components/lib'
import { CreateKanban } from 'screen/kanban/create-kanban'
import { KanbanColumn } from 'screen/kanban/kanban-column'
import { SearchPanel } from 'screen/kanban/search-panel'
import { TaskModal } from 'screen/kanban/task-modal'
import { useKanbanSearchParams, useProjectInUrl, useTaskSearchParams } from 'screen/kanban/util'
import { useDocumentTitle } from 'utils'
import { useKanbans } from 'utils/kanban'
import { useTasks } from 'utils/task'

export const KanbanScreen = () => {
  useDocumentTitle('看板列表')

  const { data: currentProject } = useProjectInUrl()
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(useKanbanSearchParams())
  const {isLoading: taskIsLoading} = useTasks(useTaskSearchParams())
  const isLoading = taskIsLoading || kanbanIsLoading

  return <ScreenContainer>
    <h1>{currentProject?.name}看板</h1>
    <SearchPanel />
    {
      isLoading ? <Spin size='large' /> : <ColumnsContainer>
        {
          kanbans?.map(kanban => <KanbanColumn key={kanban.id} kanban={kanban} />)
        }
      <CreateKanban />
      </ColumnsContainer>
    }
    <TaskModal />
  </ScreenContainer>
}

export const ColumnsContainer = styled.div`
  display: flex;
  flex: 1;
  overflow-x: scroll;
`
