import { AuthProvider } from 'context/auth-context'
import React, { ReactNode } from 'react'

export const AppProviders = ({children}: {children: ReactNode}) => {
  return <AuthProvider>
    {children}
  </AuthProvider>
}