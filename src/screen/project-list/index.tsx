import { List } from './list'
import { SearchPanel } from './search-panel'
import { useState } from 'react'
import { useDebounce, useDocumentTitle } from 'utils'
import styled from '@emotion/styled'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import { useUrlQueryParam } from 'utils/url'

export const ProjectListScreen = () => {
  const [, setParam] = useState({
    name: '',
    personId: '',
  })
  const [param] = useUrlQueryParam(['name', 'personId'])
  const debounceParam = useDebounce(param, 200)
  const { isLoading, error, data: list } = useProjects(debounceParam)
  const {data: users} = useUsers()

  useDocumentTitle('项目列表', false)
  const r = useUrlQueryParam(['name'])
  console.log('r: ', r)

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`
