import styled from '@emotion/styled'
import { Divider, List, Popover, Typography } from 'antd'
import { ButtonNoPadding } from 'components/lib'
import { useUsers } from 'utils/user'

export const UserPopover = () => {
  const { data: users, refetch } = useUsers()
  const content = <ContentContainer>
    <Typography.Text type='secondary'>组员列表</Typography.Text>
    <List>
      {
        users?.map(user => <List.Item key={user.id}>
          <List.Item.Meta title={user.name} />
        </List.Item>)
      }
    </List>
  </ContentContainer>
  return <Popover placement='bottom' content={content} onVisibleChange={() => refetch()}>
    <span>组员</span>
  </Popover>
}

const ContentContainer = styled.div`
  min-width: 30rem;
`
