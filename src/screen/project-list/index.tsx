import { List } from './list'
import { SearchPanel } from './search-panel'
import { useState, useEffect } from 'react'
import { cleanObject, useDebounce, useMount } from 'utils'
import * as qs from 'qs'
import { useHttp } from 'utils/http'
import styled from '@emotion/styled'

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  })
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])
  const debounceParam = useDebounce(param, 200)
  const client = useHttp()

  useEffect(() => {
    client('projects', {data: cleanObject(debounceParam)}).then(setList)
  }, [debounceParam])

  useMount(() => {
    client('users').then(setUsers)
  })

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`
