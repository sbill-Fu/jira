import { List } from './list'
import { SearchPanel } from './search-panel'
import { useDebounce, useDocumentTitle } from 'utils'
import styled from '@emotion/styled'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import { Row } from 'antd'
import { useProjectModal, useProjectsSearchParams } from 'screen/project-list/util'
import { ButtonNoPadding, ErrorBox } from 'components/lib'

export const ProjectListScreen = () => {
  const { open } = useProjectModal()
  useDocumentTitle('项目列表', false)
  // const [keys, setKeys] = useState<('name' | 'personId')[]>(['name', 'personId'])
  const [param, setParam] = useProjectsSearchParams()
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200))
  const {data: users} = useUsers()


  return (
    <Container>
      <Row justify='space-between'>
        <h1>项目列表</h1>
        <ButtonNoPadding type='link' onClick={() => open()}>创建项目</ButtonNoPadding>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <ErrorBox error={error}/>
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  )
}

ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
  padding: 3.2rem;
`
