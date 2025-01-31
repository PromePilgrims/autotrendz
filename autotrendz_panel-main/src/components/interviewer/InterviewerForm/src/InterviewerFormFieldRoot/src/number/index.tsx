import React from 'react'
import { InterviewerFieldProps } from '../..'
import { useField } from '@/components/interviewer/InterviewerForm/hooks/useField'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const Field: React.FC<InterviewerFieldProps['text']> = ({
  name,
  placeholder,
  suffix,
  prefix,
  className
}) => {
  const { value, onChange, formItemId } = useField(name)

  return (
    <>
      <div
        className={cn(
          'relative flex items-stretch gap-1 h-10 border bg-background rounded-md transition-all',
          'focus-within:ring-4 focus-within:ring-brand/20 focus-within:border-brand',
          className
        )}
      >
        {prefix && (
          <Button className="h-full rounded-r-none" variant={'ghost'}>
            {prefix}
          </Button>
        )}
        <input
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
          }}
          id={formItemId}
          type={'number'}
          className="flex-1 text-sm h-full px-4 bg-transparent"
        />
        {suffix && (
          <Button className="h-full rounded-l-none" variant={'ghost'}>
            {suffix}
          </Button>
        )}
      </div>
    </>
  )
}

export default Field

export const NumberField = React.lazy(() => import('.'))
