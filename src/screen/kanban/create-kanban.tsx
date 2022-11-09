import { Input } from 'antd'
import { useState } from 'react'
import { Container } from 'screen/kanban/kanban-column'
import { useKanbansQueryKey, useProjectIdInUrl } from 'screen/kanban/util'
import { useAddKanban } from 'utils/kanban'

export const CreateKanban = () => {
  const [name, setName] = useState('')
  const projectId = useProjectIdInUrl()
  const {mutateAsync: addKanban} = useAddKanban(useKanbansQueryKey())

  const submit = async () => {
    await addKanban({name, projectId})
    setName('')
  }

  return <Container>
    <Input size='large' placeholder='新建看板名称' onPressEnter={submit} value={name} onChange={evt => setName(evt.target.value)} />
  </Container>
}