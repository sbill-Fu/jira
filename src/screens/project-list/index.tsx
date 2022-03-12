import { useDebounce, useDocumentTitle } from "utils"
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import styled from '@emotion/styled'
import { useProject } from 'utils/project'
import { useUsers } from 'utils/user'
import { Button, Typography } from 'antd'
import { useProjectsSearchParams } from './utils'

export const ProjectListScreen = () => {
  useDocumentTitle('项目列表', false)

  const [param, setParam] = useProjectsSearchParams()
  const {isLoading, error, data: list, retry} = useProject(useDebounce(param, 200))
  const {data: users} = useUsers()
  

  return <Container>
    <h1>项目列表</h1>
    <SearchPanel users={users || []} param={param} setParam={setParam} />
    {error ? <Typography.Text type='danger'>{error?.message}</Typography.Text> : null}
    <List refresh={retry} loading={isLoading} users={users || []} dataSource={list || []} />
  </Container>
}

ProjectListScreen.whyDidYouRender = true

const Container = styled.div`
  padding: 3.2rem;
`