import styled from '@emotion/styled'
import { Row } from 'components/lib'
import { useAuth } from 'context/auth-context'
import { ProjectListScreen } from 'screen/project-list'
import { ReactComponent as SoftwareLogo} from 'assets/software-logo.svg'
import { Button, Dropdown, Menu } from 'antd'
import { Navigate, Route, Routes } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { ProjectScreen } from 'screen/project'
import { resetRoute } from 'utils'

export const AuthenticatedApp = () => {
  return <Container>
    <PageHeader />
    <main>
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to='projects' />} />
          {/* <Route index element={<ProjectListScreen />} /> */}
          <Route path='/projects' element={<ProjectListScreen />} />
          <Route path='/projects/:projectId/*' element={<ProjectScreen />} />
        </Routes>
      </Router>
    </main>
  </Container>
}

const PageHeader = () => {
  const {logout, user} = useAuth()
  return <Header between={true}>
    <HeaderLeft gap={true}>
      <Button type='link' onClick={resetRoute}>
        <SoftwareLogo width={'18rem'} color='rgb(38, 132, 255)' />
      </Button>
      <h2>项目</h2>
      <h2>用户</h2>
    </HeaderLeft>
    <HeaderRight>
      <Dropdown overlay={<Menu>
        <Menu.Item>
          <Button type='link' onClick={logout}>登出</Button>
        </Menu.Item>
      </Menu>}>
        <Button type='link'>
          Hi, {user?.name}
        </Button>
      </Dropdown>
    </HeaderRight>
  </Header>
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem calc(100vh - 6rem);
  height: 100vh;
`

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`

const HeaderLeft = styled(Row)`
`

const HeaderRight = styled.div`
  
`
