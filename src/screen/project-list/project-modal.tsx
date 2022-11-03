import { Button, Drawer } from 'antd'
import { useProjectModal } from 'screen/project-list/util'

export const ProjectModal = () => {
  const { projectModalOpen, close, editingProject, isLoading } = useProjectModal()
  return <Drawer visible={projectModalOpen} width='100%' onClose={close}>
    <h1>Project Modal</h1>
    <Button onClick={close}>关闭</Button>
  </Drawer>
}