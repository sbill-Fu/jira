import { useState } from "react"
import { useDebounce, useDocumentTitle } from "utils"
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import styled from '@emotion/styled'
import { useProject } from 'utils/project'
import { useUsers } from 'utils/user'
import { Typography } from 'antd'
import { useUrlQueryParam } from 'utils/url'

export const ProjectListScreen = () => {
  // const [, setParam] = useState({
  //   name: '',
  //   personId: ''
  // })
  const [keys] = useState<('name' | 'personId')[]>(['name', 'personId'])
  const [param, setParam] = useUrlQueryParam(keys)
  const debounceParam = useDebounce(param, 200)
  const {isLoading, error, data: list} = useProject(debounceParam)
  const {data: users} = useUsers()
  
  useDocumentTitle('项目列表', false)

  return <Container>
    <h1>项目列表</h1>
    <SearchPanel users={users || []} param={param} setParam={setParam} />
    {error ? <Typography.Text type='danger'>{error?.message}</Typography.Text> : null}
    <List loading={isLoading} users={users || []} dataSource={list || []} />
  </Container>
}

ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
  padding: 3.2rem;
`