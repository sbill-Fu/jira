import { Children } from './children'
import React from 'react'

export const testContext = React.createContext('test')

export const Father = () => {
  return <div>
    father
    <testContext.Provider value='hi'>
      <Children />
    </testContext.Provider>
  </div>
}
