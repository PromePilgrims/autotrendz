import React from 'react'
import { InterviewerForm } from '../../types'
import InterviewerFormFieldRoot from '../InterviewerFormFieldRoot'
import { FormField } from '@/components/ui/form'
import InterviewerFormWrapDefault from './src/InterviewerFormWrapDefault'
import InterviewerFieldVisibility from './src/InterviewerFieldVisibility'

export interface InterviewerFormFieldProps {
  field: InterviewerForm.Config.Field
}

const InterviewerFormField: React.FC<InterviewerFormFieldProps> = (props) => {
  return (
    <>
      <FormField
        name={props.field.name}
        render={() => (
          <InterviewerFieldVisibility name={props.field.name}>
            <InterviewerFormWrapDefault
              // @ts-ignore
              label={props.field.title}
              description={props.field.description}
            >
              <InterviewerFormFieldRoot {...props} />
            </InterviewerFormWrapDefault>
          </InterviewerFieldVisibility>
        )}
      />
    </>
  )
}

export default InterviewerFormField
