import React from 'react'
import { InterviewerFieldProps } from '../..'

const Field: React.FC<InterviewerFieldProps['ui']> = (props) => {
  const { component: Component } = props

  return (
    <>
      <Component {...props} />
    </>
  )
}

export default Field

export const UiField = React.lazy(() => import('.'))
