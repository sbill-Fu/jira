import styled from '@emotion/styled'
import { Row } from 'components/lib'
import { useAuth } from 'context/auth-context'
import { ProjectListScreen } from 'screen/project-list'

export const AuthenticatedApp = () => {
  const {logout} = useAuth()
  return <Container>
    <Header between={true}>
      <HeaderLeft gap={true}>
        <h2>logo</h2>
        <h2>项目</h2>
        <h2>用户</h2>
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

const Header = styled(Row)`
`

const HeaderLeft = styled(Row)`
`

const HeaderRight = styled.div`
  
`
