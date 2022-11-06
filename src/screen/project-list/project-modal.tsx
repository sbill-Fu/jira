import styled from '@emotion/styled'
import { Button, Drawer, Form, Input, Spin } from 'antd'
import { ErrorBox } from 'components/lib'
import { UserSelect } from 'components/user-select'
import { useEffect } from 'react'
import { useProjectModal, useProjectsQueryKey } from 'screen/project-list/util'
import { useAddProject, useEditProject } from 'utils/project'

export const ProjectModal = () => {
  const { projectModalOpen, close, editingProject, isLoading } = useProjectModal()
  const useMutateProject = editingProject ? useEditProject : useAddProject

  const {mutateAsync, error, isLoading: mutateLoading} = useMutateProject(useProjectsQueryKey())
  const [form] = Form.useForm()
  const onFinish = (values: any) => {
    mutateAsync({...editingProject, ...values}).then(closeModal)
  }

  const closeModal = () => {
    form.resetFields()
    close()
  }

  const title = editingProject ? '编辑项目' : '创建项目'

  useEffect(() => {
    form.setFieldsValue(editingProject)
  }, [editingProject, form])
  
  return <Drawer forceRender={true} visible={projectModalOpen} width='100%' onClose={closeModal}>
    <Container>
      {
        isLoading ? <Spin size='large' /> : <>
          <h1>{title}</h1>
          <ErrorBox error={error} />
          <Form form={form} layout='vertical' style={{width: '40rem'}} onFinish={onFinish}>
            <Form.Item label='名称' name={'name'} rules={[{required: true, message: '请输入项目名'}]}>
              <Input placeholder='请输入项目名称' />
            </Form.Item>
            <Form.Item label='部门' name={'organization'} rules={[{required: true, message: '请输入部门名'}]}>
              <Input placeholder='请输入部门名' />
            </Form.Item>
            <Form.Item label='负责人' name={'personId'}>
              <UserSelect defaultOptionName='负责人' />
            </Form.Item>
            <Form.Item style={{textAlign: 'right'}}>
              <Button loading={mutateLoading} type='primary' htmlType='submit'>
                提交
              </Button>
            </Form.Item>
          </Form>
        </>
      }
    </Container>
  </Drawer>
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  place-items: center;
  height: 80vh;
`
