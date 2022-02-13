import { testContext } from 'my-test'
import React from 'react'

export const Children = () => {
  const context = React.useContext(testContext)
  return <div>
    children
    {context}
  </div>
}