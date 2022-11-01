import { List } from './list'
import { SearchPanel } from './search-panel'
import { useDebounce, useDocumentTitle } from 'utils'
import styled from '@emotion/styled'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import { Row, Typography } from 'antd'
import { useProjectsSearchParams } from 'screen/project-list/util'
import { useDispatch } from 'react-redux'
import { ButtonNoPadding } from 'components/lib'
import { projectListActions } from 'screen/project-list/project-list.slice'

export const ProjectListScreen = () => {
  const dispatch = useDispatch()
  useDocumentTitle('项目列表', false)
  // const [keys, setKeys] = useState<('name' | 'personId')[]>(['name', 'personId'])
  const [param, setParam] = useProjectsSearchParams()
  const { isLoading, error, data: list, retry } = useProjects(useDebounce(param, 200))
  const {data: users} = useUsers()


  return (
    <Container>
      <Row justify='space-between'>
        <h1>项目列表</h1>
        <ButtonNoPadding
          onClick={() => dispatch(projectListActions.openProjectModal())}
          type='link'
        >
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {
        error ? (
          <Typography.Text type='danger'>{error.message}</Typography.Text>
        ) : null
      }
      <List refresh={retry} loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  )
}

ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
  padding: 3.2rem;
`
