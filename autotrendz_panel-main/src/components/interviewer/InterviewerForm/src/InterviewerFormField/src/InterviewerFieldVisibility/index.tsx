import { useField } from '@/components/interviewer/InterviewerForm/hooks/useField'
import React, { ReactNode } from 'react'

interface InterviewerFieldVisibilityProps {
  name: string
  children?: ReactNode
}

const InterviewerFieldVisibility: React.FC<InterviewerFieldVisibilityProps> = ({
  name,
  children
}) => {
  const { isHidden } = useField(name)
  return <>{!isHidden && <>{children}</>}</>
}

export default InterviewerFieldVisibility
