import styled from '@emotion/styled'
import { ScreenContainer } from 'components/lib'
import { KanbanColumn } from 'screen/kanban/kanban-column'
import { SearchPanel } from 'screen/kanban/search-panel'
import { useKanbanSearchParams, useProjectInUrl } from 'screen/kanban/util'
import { useDocumentTitle } from 'utils'
import { useKanbans } from 'utils/kanban'

export const KanbanScreen = () => {
  useDocumentTitle('看板列表')

  const { data: currentProject } = useProjectInUrl()
  const { data: kanbans } = useKanbans(useKanbanSearchParams())

  return <ScreenContainer>
    <h1>{currentProject?.name}看板</h1>
    <SearchPanel />
    <ColumnsContainer>
      {
        kanbans?.map(kanban => <KanbanColumn key={kanban.id} kanban={kanban} />)
      }
    </ColumnsContainer>
  </ScreenContainer>
}

const ColumnsContainer = styled.div`
  display: flex;
  flex: 1;
  overflow-x: scroll;
`
