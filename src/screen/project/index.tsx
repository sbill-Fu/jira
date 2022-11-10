import { Link } from 'react-router-dom'
import { Route, Routes, useLocation } from 'react-router'
import { KanbanScreen } from 'screen/kanban'
import { EpicScreen } from 'screen/epic'
import styled from '@emotion/styled'
import { Menu } from 'antd'

const useRouteType = () => {
  const units = useLocation().pathname.split('/')
  return units.at(-1)
}

export const ProjectScreen = () => {
  const routeType = useRouteType() || ''
  
  return <Container>
    <Aside>
      <Menu mode='inline' selectedKeys={[routeType]}>
        <Menu.Item key={'kanban'}>
          <Link to={'kanban'}>看板</Link>
        </Menu.Item>
        <Menu.Item key={'epic'}>
          <Link to={'epic'}>任务组</Link>
        </Menu.Item>
      </Menu>
    </Aside>
    <Main>
      <Routes>
        <Route path='/kanban' element={<KanbanScreen />} />
        <Route path='/epic' element={<EpicScreen />} />
        <Route index element={<KanbanScreen />} />
      </Routes>
    </Main>

  </Container>
}

const Aside = styled.div`
  background-color: rgb(244, 245, 247);
  display: flex;
`

const Main = styled.div`
  display: flex;
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  overflow: hidden;
  width: 100%;
`
