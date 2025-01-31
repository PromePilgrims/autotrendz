import React from 'react'
import { InterviewerFieldProps } from '../..'
import { cn } from '@/lib/utils'
import { CheckIcon } from '@radix-ui/react-icons'
import { AnimatePresence } from 'framer-motion'
import { Textarea } from '@/components/ui/textarea'
import { useField } from '@/components/interviewer/InterviewerForm/hooks/useField'
import MotionOtherAnimation from '@/components/interviewer/InterviewerForm/ui-helpers/MotionOtherAnimation'

type Value = {
  other: string
  values: string[]
}

const Field: React.FC<InterviewerFieldProps['checkbox']> = ({
  className,
  options,
  name,
  onChange: onChangeProp
}) => {
  const { value = { values: [], other: '' }, onChange, form } = useField<Value>(name)

  const isOptionSelected = (optionValue: string) => {
    return value.values.includes(optionValue)
  }

  const onClickOption = (optionValue: string) => {
    if (isOptionSelected(optionValue)) {
      onChange({
        values: value.values.filter((v) => v !== optionValue),
        other: value.other
      })
      onChangeProp?.(
        {
          values: value.values.filter((v) => v !== optionValue),
          other: value.other
        },
        form
      )
    } else {
      onChange({
        values: [...value.values, optionValue],
        other: value.other
      })

      onChangeProp?.(
        {
          values: [...value.values, optionValue],
          other: value.other
        },
        form
      )
    }
  }

  const onChangeOther = (other: string) => {
    onChange({
      values: value.values,
      other
    })
  }

  return (
    <>
      <div className={cn('grid grid-cols-1 gap-2', className)}>
        {options.map((option, o) => (
          <div
            key={`option.${o}.${option.value}`}
            data-state={isOptionSelected(option.value) ? 'selected' : 'default'}
            className={cn(
              'group flex flex-col pb-4 rounded-xl border bg-card select-none transition-all ring-brand/20 cursor-pointer',
              'data-[state=selected]:border-brand data-[state=selected]:ring-2'
            )}
          >
            <div
              className="p-4 pb-0 gap-4 flex items-center"
              onClick={() => {
                onClickOption(option.value)
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
                  onClick={() => {
                    onClickOption(option.value)
                  }}
                />
              </div>
              <div className="flex flex-1 flex-col">
                <div
                  className="flex flex-col"
                  onClick={() => {
                    onClickOption(option.value)
                  }}
                >
                  <span className="font-bold text-sm">{option.label}</span>
                  {option.description && (
                    <span className="text-xs text-muted-foreground">
                      {option.description}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <AnimatePresence>
              {option.other && isOptionSelected(option.value) && (
                <MotionOtherAnimation>
                  <div className="pt-4 px-4">
                    <Textarea
                      placeholder={option.other.placeholder}
                      value={value.other}
                      disabled={!isOptionSelected(option.value)}
                      onChange={(e) => {
                        onChangeOther(e.target.value)
                      }}
                      className="px-2 py-1 text-xs resize-none"
                    />
                  </div>
                </MotionOtherAnimation>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </>
  )
}

export default Field

export const CheckboxField = React.lazy(() => import('.'))
