import styled from "@emotion/styled";
import { Button, Divider, List, Popover, Typography } from 'antd'
import { useProject } from 'utils/project'
import { ButtonNoPadding } from './lib';

export const ProjectPopover = (props: {setProjectModalOpen: (isOpen: boolean) => void}) => {
  const {data: projects, isLoading} = useProject()
  const pinProjects = projects?.filter(project => project.pin)

  const content = <ContentContainer>
    <Typography.Text type='secondary'>收藏项目</Typography.Text>
    <List>
      {
        pinProjects?.map(project => <List.Item>
          <List.Item.Meta title={project.name} />
        </List.Item>)
      }
    </List>
    <Divider />
    <ButtonNoPadding type='link' onClick={() => props.setProjectModalOpen(true)}>创建项目</ButtonNoPadding>
  </ContentContainer>
  return  <Popover placement='bottom' content={content}>
    <span>项目</span>
  </Popover>
}

const ContentContainer = styled.div`
  min-width: 30rem;
`