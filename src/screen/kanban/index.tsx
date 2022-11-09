import styled from '@emotion/styled'
import { KanbanColumn } from 'screen/kanban/kanban-column'
import { useKanbanSearchParams, useProjectInUrl } from 'screen/kanban/util'
import { useDocumentTitle } from 'utils'
import { useKanbans } from 'utils/kanban'

export const KanbanScreen = () => {
  useDocumentTitle('看板列表')

  const { data: currentProject } = useProjectInUrl()
  const { data: kanbans } = useKanbans(useKanbanSearchParams())

  return <div>
    <h1>{currentProject?.name}看板</h1>
    <ColumnsContainer>
      {
        kanbans?.map(kanban => <KanbanColumn key={kanban.id} kanban={kanban} />)
      }
    </ColumnsContainer>
  </div>
}

const ColumnsContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`
