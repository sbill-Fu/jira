import { useTaskSearchParams } from './util'
import {useSetUrlSearchParam} from 'utils/url'
import { Button, Input, Row } from 'antd'
import { UserSelect } from 'components/user-select'
import { TaskTypeSelect } from 'components/task-type-select'

export const SearchPanel = () => {
  const searchParams = useTaskSearchParams()
  const setSearchParams = useSetUrlSearchParam()
  const reset = () => {
    setSearchParams({
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
      name: undefined
    })
  }

  return <Row style={{marginBottom: '12px', marginRight: '12px'}}>
    <Input style={{width: '20rem'}} placeholder='任务名' value={searchParams.name} onChange={evt => setSearchParams({name: evt.target.value})} />
    <UserSelect defaultOptionName='经办人' value={searchParams.processorId} onChange={value => setSearchParams({processorId: value})} />
    <TaskTypeSelect defaultOptionName='类型' value={searchParams.typeId} onChange={value => setSearchParams({typeId: value})} />
    <Button onClick={reset}>清除筛选器</Button>
  </Row>
}