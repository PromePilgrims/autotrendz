import React from 'react'
import { InterviewerFieldProps } from '../..'
import InterviewerFormProvider from '../../../InterviewerFormProvider'
import { cn } from '@/lib/utils'

const Field: React.FC<InterviewerFieldProps['grid']> = ({
  name,
  fields,
  className
}) => {
  return (
    <>
      <div className={cn('grid grid-cols-2', className)}>
        <InterviewerFormProvider
          configs={{
            fields: fields.map((field) => ({
              ...field,
              name: `${name}.${field.name}`
            }))
          }}
        />
      </div>
    </>
  )
}

export default Field

export const GridField = React.lazy(() => import('.'))
