import { useQuery } from 'react-query';
import { Task } from 'types/task';
import { useHttp } from './https';

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp()

  return useQuery<Task[]>(['tasks', param], () => 
    client('tasks', {data: param})
  )
}