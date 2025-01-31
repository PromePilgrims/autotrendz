import {
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from '@/components/ui/form'
import React, { ReactNode } from 'react'

interface InterviewerFormWrapDefaultProps {
  label?: ReactNode
  description?: ReactNode
  children: ReactNode
}

const InterviewerFormWrapDefault: React.FC<InterviewerFormWrapDefaultProps> = ({
  children,
  description,
  label
}) => {
  return (
    <>
      <FormItem>
        {(label || description) && (
          <FormLabel className="flex flex-col mb-3 gap-0">
            {label && (
              <span className="text-lg font-bold max-w-[550px]">{label}</span>
            )}
            {description && (
              <FormDescription className="text-base">{description}</FormDescription>
            )}
          </FormLabel>
        )}
        <FormControl>{children}</FormControl>
        <FormMessage />
      </FormItem>
    </>
  )
}

export default InterviewerFormWrapDefault
