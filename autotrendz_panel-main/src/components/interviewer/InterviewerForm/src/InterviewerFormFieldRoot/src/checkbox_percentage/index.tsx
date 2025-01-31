import React, { useMemo } from 'react'
import { InterviewerFieldProps } from '../..'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { CheckIcon } from '@radix-ui/react-icons'
import { Slider } from '@/components/ui/slider'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { LuSettings2 } from 'react-icons/lu'
import { useField } from '@/components/interviewer/InterviewerForm/hooks/useField'

interface Value
  extends Array<{
    value: string
    percentage: number
  }> {}

const Field: React.FC<InterviewerFieldProps['checkbox_percentage']> = ({
  name,
  options
}) => {
  const { value = [], onChange } = useField<Value>(name)
  const isOptionSelected = (optionValue: string) => {
    return value.find((v) => v.value === optionValue)
  }
  const total = value.reduce((acc, v) => {
    if (isOptionSelected(v.value)) {
      return acc + (v.percentage ?? 0)
    }

    return acc
  }, 0)

  const getOptionPercentage = (optionValue: string) => {
    const option = value.find((v) => v.value === optionValue)
    return option?.percentage ?? 0
  }
  const onProportionalAjust = () => {
    const selectedOptions = value
      .filter((v) => v.percentage > 0)
      .filter((v) => isOptionSelected(v.value))
    const totalPercentage = selectedOptions.reduce((acc, v) => acc + v.percentage, 0)
    const proportional = 100 / totalPercentage

    const nextValues = value.filter((v) => isOptionSelected(v.value))

    onChange(
      nextValues.map((v) => {
        if (v.percentage > 0) {
          return {
            value: v.value,
            percentage: parseInt((v.percentage * proportional).toFixed(2), 10)
          }
        }

        return v
      })
    )
  }

  const onEqualsAjust = () => {
    const selectedOptions = value.filter((v) => isOptionSelected(v.value))
    const nextValues = value.filter((v) => isOptionSelected(v.value))
    const equals = 100 / selectedOptions.length

    onChange(
      nextValues.map((v) => {
        return {
          value: v.value,
          percentage: parseInt(equals.toFixed(2), 10)
        }
      })
    )
  }

  const color = useMemo(() => {
    if (total < 100) {
      return 'hsl(var(--brand))'
    }

    if (total === 100) {
      return 'hsl(var(--success))'
    }

    if (total > 100) {
      return 'hsl(var(--destructive))'
    }
  }, [total])

  return (
    <>
      <div
        className="flex flex-col gap-2"
        style={
          {
            '--primary-color': color
          } as React.CSSProperties
        }
      >
        {options.map((option, o) => (
          <div
            key={`option.${o}`}
            className={cn(
              'p-4 rounded-xl border cursor-pointer select-none transition-all',
              isOptionSelected(option.value) ? 'border-[var(--primary-color)]' : ''
            )}
          >
            <div className="flex flex-col">
              <div
                className="flex items-center gap-4"
                onClick={() => {
                  if (isOptionSelected(option.value)) {
                    onChange(value.filter((v) => v.value !== option.value))
                  } else {
                    onChange([...value, { value: option.value, percentage: 0 }])
                  }
                }}
              >
                <div
                  className={cn(
                    'w-6 h-6 rounded-full border flex items-center justify-center transition-all',
                    isOptionSelected(option.value)
                      ? 'border-[var(--primary-color)]'
                      : ''
                  )}
                >
                  <CheckIcon
                    className={cn(
                      'w-4 h-4 text-[var(--primary-color)] transition-all',
                      isOptionSelected(option.value) ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <span className="text-sm font-semibold">{option.label}</span>
                  {option.description && (
                    <span className="text-xs text-muted-foreground">
                      {option.description}
                    </span>
                  )}
                </div>
                {isOptionSelected(option.value) && (
                  <div className="flex items-center gap-1">
                    <Input
                      className="bg-[var(--primary-color)] border-0 text-brand-foreground font-bold text-xl w-[100px] disabled:opacity-100"
                      disabled
                      value={getOptionPercentage(option.value) + '%'}
                    />
                  </div>
                )}
              </div>
              <AnimatePresence>
                {isOptionSelected(option.value) && (
                  <motion.div
                    initial={{
                      height: 0,
                      opacity: 0
                    }}
                    exit={{
                      height: 0,
                      opacity: 0
                    }}
                    animate={{
                      height: 'auto',
                      opacity: 1
                    }}
                  >
                    <div className="pt-6">
                      <Slider
                        defaultValue={[50]}
                        value={[getOptionPercentage(option.value)]}
                        onValueChange={(nextValue) => {
                          const newValue = value.map((v) => {
                            if (v.value === option.value) {
                              return {
                                value: option.value,
                                percentage: nextValue[0]
                              }
                            }

                            return v
                          })

                          const newPercentage = newValue.reduce((acc, v) => {
                            if (isOptionSelected(v.value)) {
                              return acc + v.percentage
                            }

                            return acc
                          }, 0)

                          if (newPercentage <= 100) {
                            onChange(newValue)
                          } else {
                            // TODO: SEI LA
                          }
                        }}
                        rangeClassName="bg-[var(--primary-color)]"
                        thumbClassName="border-[var(--primary-color)]"
                        trackClassName="bg-zinc-200"
                        max={100}
                        step={1}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center gap-4 px-4 py-3 rounded-lg border">
          <div className="flex items-center gap-2">
            <Button onClick={onProportionalAjust} variant={'outline'} size={'sm'}>
              <LuSettings2 className="w-4 h-4" />
              <span>Ajustar Proporcionalmente</span>
            </Button>
            <Button onClick={onEqualsAjust} variant={'outline'} size={'sm'}>
              <LuSettings2 className="w-4 h-4" />
              <span>Ajustar Igualmente</span>
            </Button>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-xl font-bold">Total</span>
            <span
              className={cn(
                'text-4xl font-bold w-[100px]',
                total === 100 && 'text-green-500',
                total < 100 && 'text-orange-500',
                total > 100 && 'text-red-500'
              )}
            >
              {total}%
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Field

export const CheckboxPercentageField = React.lazy(() => import('.'))
