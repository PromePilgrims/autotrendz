import React from 'react'
import { InterviewerFieldProps } from '../..'
import { cn } from '@/lib/utils'
import { CheckIcon } from '@radix-ui/react-icons'
import { Textarea } from '@/components/ui/textarea'
import { AnimatePresence } from 'framer-motion'
import { useField } from '@/components/interviewer/InterviewerForm/hooks/useField'
import MotionOtherAnimation from '@/components/interviewer/InterviewerForm/ui-helpers/MotionOtherAnimation'

interface Value {
  selected?: string
  other?: string
}

const Field: React.FC<InterviewerFieldProps['radio']> = ({
  className,
  options,
  name,
  onChange: onChangeProp
}) => {
  const {
    value = {
      selected: '',
      other: ''
    },
    onChange,
    form
  } = useField<Value>(name)

  const isOptionSelected = (optionValue: string) => {
    return value.selected === optionValue
  }

  return (
    <>
      <div className={cn('grid grid-cols-1 gap-2', className)}>
        {options.map((option, o) => (
          <div
            key={`option.${o}.${option.value}`}
            data-state={isOptionSelected(option.value) ? 'selected' : 'default'}
            className={cn(
              'group flex gap-4 p-4 rounded-xl border bg-card select-none transition-all ring-brand/20 cursor-pointer',
              'data-[state=selected]:border-brand data-[state=selected]:ring-2'
            )}
            onClick={() => {
              onChange({
                other: value.other,
                selected: option.value
              })

              onChangeProp?.(option.value, form)
            }}
          >
            <div
              className={cn(
                'w-6 h-6 rounded-full border flex items-center justify-center transition-all',
                'group-data-[state=selected]:border-brand group-data-[state=selected]:ring-2 group-data-[state=selected]:ring-brand/20'
              )}
            >
              <CheckIcon
                className={cn(
                  'w-4 h-4 text-brand transition-all',
                  'group-data-[state=selected]:opacity-100 opacity-0'
                )}
              />
            </div>
            <div className="flex flex-1 flex-col">
              <span className="font-bold text-sm">{option.label}</span>
              {option.description && (
                <span className="text-xs text-muted-foreground">
                  {option.description}
                </span>
              )}
              <AnimatePresence>
                {option.other && isOptionSelected(option.value) && (
                  <MotionOtherAnimation>
                    <div className="pt-4">
                      <Textarea
                        placeholder={option.other.placeholder}
                        value={value.other}
                        disabled={!isOptionSelected(option.value)}
                        onChange={(e) => {
                          onChange({
                            other: e.target.value,
                            selected: value.selected
                          })
                        }}
                        className="px-2 py-1 text-xs resize-none"
                      />
                    </div>
                  </MotionOtherAnimation>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Field

export const RadioField = React.lazy(() => import('.'))
