import styled from '@emotion/styled'
import { useAuth } from 'context/auth-context'
import { ProjectListScreen } from 'screen/project-list'

export const AuthenticatedApp = () => {
  const {logout} = useAuth()
  return <Container>
    <Header>
      <HeaderLeft>
        <h3>logo</h3>
        <h3>项目</h3>
        <h3>用户</h3>
      </HeaderLeft>
      <HeaderRight>
        <button onClick={logout}>登出</button>
      </HeaderRight>
    </Header>
    <main>
      <ProjectListScreen />
    </main>
  </Container>
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem calc(100vh - 6rem);
  height: 100vh;
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`

const HeaderRight = styled.div`
  
`
