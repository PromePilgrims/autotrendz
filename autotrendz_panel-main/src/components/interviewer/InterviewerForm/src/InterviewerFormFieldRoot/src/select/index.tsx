import React, { useEffect, useRef } from 'react'
import { InterviewerFieldProps } from '../..'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { AnimatePresence } from 'framer-motion'
import { useField } from '@/components/interviewer/InterviewerForm/hooks/useField'
import MotionOtherAnimation from '@/components/interviewer/InterviewerForm/ui-helpers/MotionOtherAnimation'
import { cn } from '@/lib/utils'

const Field: React.FC<InterviewerFieldProps['select']> = ({
  name,
  placeholder,
  options,
  className
}) => {
  const otherInputRef = useRef<HTMLInputElement>(null)
  const { value, onChange, formItemId } = useField(name)
  const val = {
    selected: value?.selected,
    other: value?.other
  }
  const selectedOption = options.find((option) => option.value === val.selected)

  useEffect(() => {
    if (selectedOption?.other) {
      setTimeout(() => {
        otherInputRef.current?.focus()
      }, 100)
    }
  }, [val.selected])

  return (
    <>
      <div className="flex flex-col">
        <div className="relative flex items-stretch">
          <Select
            value={val.selected}
            onValueChange={(v) => {
              onChange({
                ...val,
                selected: v
              })
            }}
          >
            <SelectTrigger className={cn('h-auto', className)} id={formItemId}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option, o) => (
                <SelectItem key={`option.${o}.${option.value}`} value={option.value}>
                  <div className="flex flex-col flex-1 items-start">
                    <span>{option.label}</span>
                    {option.description && (
                      <span className="text-xs text-muted-foreground">
                        {option.description}
                      </span>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <AnimatePresence>
          {selectedOption && selectedOption.other && (
            <MotionOtherAnimation>
              <Input
                placeholder={selectedOption.other.placeholder}
                value={val.other}
                ref={otherInputRef}
                onChange={(e) => {
                  onChange({
                    ...val,
                    other: e.target.value
                  })
                }}
                id={formItemId}
                className="mt-2"
              />
            </MotionOtherAnimation>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default Field

export const SelectField = React.lazy(() => import('.'))
