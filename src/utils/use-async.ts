import { useCallback, useReducer, useState } from 'react'
import { useMountedRef } from 'utils'

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
  stat: 'idle',
  data: null,
  error: null
}

const defaultConfig = {
  throwOnError: false
}

/**
 * ...args 表示 dispatch 函数接收的是一个个的参数，比如 dispatch(1, 2), args 还是一个数组
 * safe 表示这个 dispatch 是安全的，因为会帮我们判断组件是否是挂载好的
 *  */
const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef()
  return useCallback((...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0), [dispatch, mountedRef])
}

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  const config = {...defaultConfig, initialConfig}
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({...state, ...action}),
    {
      ...defaultInitialState,
      ...initialState
    }
  )

  const safeDispatch = useSafeDispatch(dispatch)
  const [retry, setRetry] = useState(() => () => {})

  const setData = useCallback((data: D) => safeDispatch({
    data,
    stat: 'success',
    error: null
  }), [safeDispatch])

  const setError = useCallback((error: Error) => safeDispatch({
    error,
    stat: 'error',
    data: null
  }), [safeDispatch])

  const run = useCallback((promise: Promise<D>, runConfig?: { retry: () => Promise<D>}) => {
    if (!promise || !promise.then) {
      throw new Error('请输入 Promise 类型数据')
    }
    safeDispatch({stat: 'loading'})
    setRetry(() => () => {
      if (runConfig?.retry) {
        run(runConfig?.retry(), runConfig)
      }
    })
    return promise.then(data => {
      setData(data)
      return data
    }).catch(error => {
      setError(error)
      if (config.throwOnError) {
        return Promise.reject(error)
      }
      return error
    })
  }, [config.throwOnError, setData, setError, safeDispatch])

  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    // retry 被调用时重新跑一遍 run，让 state 刷新一遍
    retry,
    ...state
  }
}