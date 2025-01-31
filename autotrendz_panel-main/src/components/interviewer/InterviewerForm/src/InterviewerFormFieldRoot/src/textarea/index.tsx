import React from 'react'
import { InterviewerFieldProps } from '../..'
import { Textarea } from '@/components/ui/textarea'
import { useField } from '@/components/interviewer/InterviewerForm/hooks/useField'

const Field: React.FC<InterviewerFieldProps['textarea']> = ({
  name,
  placeholder
}) => {
  const { value, onChange, formItemId } = useField(name)

  return (
    <>
      <div className="relative flex items-stretch">
        <Textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
          }}
          id={formItemId}
        />
      </div>
    </>
  )
}

export default Field

export const TextareaField = React.lazy(() => import('.'))
