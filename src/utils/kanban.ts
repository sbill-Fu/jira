import { useQuery } from 'react-query';
import { Kanban } from 'types/kanban';
import { useHttp } from './https';

export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp()

  return useQuery<Kanban[]>(['kanbans', param], () => 
    client('kanbans', {data: param})
  )
}