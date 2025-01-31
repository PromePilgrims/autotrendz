import React, { useEffect } from 'react'
import { InterviewerForm } from '../../types'
import InterviewerFormField from '../InterviewerFormField'
import { useInterfiewFieldsStore } from './store'

interface InterviewerFormProviderProps {
  configs: InterviewerForm.Config.Root
}

const InterviewerFormProvider: React.FC<InterviewerFormProviderProps> = ({
  configs
}) => {
  const addFields = useInterfiewFieldsStore((state) => state.addFields)

  useEffect(() => {
    addFields(configs.fields)
  }, [])

  return (
    <>
      {configs.fields.map((field, f) => (
        <React.Fragment key={`field.${field.name}.${f}`}>
          <InterviewerFormField field={field} />
        </React.Fragment>
      ))}
    </>
  )
}

export default InterviewerFormProvider
