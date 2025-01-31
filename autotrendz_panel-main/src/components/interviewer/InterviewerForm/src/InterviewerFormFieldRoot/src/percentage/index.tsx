import React from 'react'
import { InterviewerFieldProps } from '../..'
import { cn } from '@/lib/utils'
import { Slider } from '@/components/ui/slider'
import { useField } from '@/components/interviewer/InterviewerForm/hooks/useField'

const Field: React.FC<InterviewerFieldProps['percentage']> = ({
  name,
  className
}) => {
  const { value, onChange } = useField(name)

  return (
    <>
      <div className={cn('flex flex-col gap-2', className)}>
        <div className="flex justify-end">
          <div className="px-4 rounded-lg py-1 text-xs bg-brand text-brand-foreground">
            {value || 0}%
          </div>
        </div>
        <Slider
          value={[value || 0]}
          onValueChange={([v]) => {
            onChange(v)
          }}
        />
      </div>
    </>
  )
}

export default Field

export const PercentageField = React.lazy(() => import('.'))
