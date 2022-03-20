import { useDebounce, useDocumentTitle } from "utils"
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import styled from '@emotion/styled'
import { useProject, useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import { Row, Typography } from 'antd'
import { useProjectModal, useProjectsSearchParams } from './utils'
import { ButtonNoPadding, ErrorBox } from 'components/lib'

export const ProjectListScreen = () => {
  useDocumentTitle('项目列表', false)

  const {open} = useProjectModal()
  const [param, setParam] = useProjectsSearchParams()
  const {isLoading, error, data: list} = useProjects(useDebounce(param, 200))
  const {data: users} = useUsers()
  

  return <Container>
    <Row justify='space-between'>
      <h1>项目列表</h1>
      <ButtonNoPadding
        onClick={open}
        type='link'
      >
        创建项目
      </ButtonNoPadding>
    </Row>
    <SearchPanel users={users || []} param={param} setParam={setParam} />
    <ErrorBox error={error} />
    <List
      loading={isLoading}
      users={users || []}
      dataSource={list || []}
    />
  </Container>
}

ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
  padding: 3.2rem;
`