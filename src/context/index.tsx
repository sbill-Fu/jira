import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { AuthProvider } from './auth-context';
import { store } from 'store'

export const AppProviders = ({children}: {children: ReactNode}) => {
  const queryClient = new QueryClient()
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  )
}