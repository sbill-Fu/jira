import styled from "@emotion/styled";
import { Divider, List, Popover, Typography } from 'antd'
import { useProjectModal } from 'screens/project-list/utils';
import { useProject, useProjects } from 'utils/project'
import { ButtonNoPadding } from './lib';
// import { ButtonNoPadding } from './lib';

export const ProjectPopover = () => {
  const {open} = useProjectModal()
  const {data: projects, isLoading} = useProjects()
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
    <ButtonNoPadding
      onClick={open}
      type='link'
    >
      创建项目
    </ButtonNoPadding>
  </ContentContainer>

  return  <Popover placement='bottom' content={content}>
    <span>项目</span>
  </Popover>
}

const ContentContainer = styled.div`
  min-width: 30rem;
`