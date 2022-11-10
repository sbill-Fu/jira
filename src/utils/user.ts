import { useQuery } from 'react-query'
import { User } from "types/user"
import { useHttp } from 'utils/http'

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp()
  
  return useQuery<User[]>(['users', param], () => client('users', { data: param }).then((list: User[]) => {
    // 将接口返回的值加上 key 值，否则 table 会有警告信息
    return list.map(item => {
      return {
        ...item,
        key: item.id
      }
    })
  }))
}