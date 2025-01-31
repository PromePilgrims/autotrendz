import React from 'react'
import { OnRecallProps } from '../..'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { ClockIcon, TimerIcon } from '@radix-ui/react-icons'
import { addDays, addMinutes, startOfDay, addHours, format } from 'date-fns'
import { cn } from '@/lib/utils'

interface RecallButtonProps {
  onRecall?: (props: OnRecallProps) => void | Promise<void>
  className?: string
}

const RecallButton: React.FC<RecallButtonProps> = ({ className, onRecall }) => {
  const form = useForm()

  return (
    <>
      <Popover
        onOpenChange={(isOpen) => {
          if (isOpen) {
            form.setValue('date', null)
          }
        }}
      >
        <PopoverTrigger asChild>
          <Button
            className={cn(
              'px-2 gap-2 py-3 h-auto data-[state=open]:bg-violet-500 data-[state=open]:text-violet-50',
              'text-violet-500 border-violet-500 hover:bg-violet-500 hover:text-violet-50',
              className
            )}
            size={'lg'}
            variant={'outline'}
            type={'button'}
          >
            <TimerIcon className="w-8 h-8" />
            <span className="flex-1 text-lg truncate font-medium">
              {'Ligar mais tarde'}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent align={'end'} className="w-[450px] flex flex-col">
          <Form {...form}>
            <form
              key={'signal'}
              className="flex flex-col gap-2"
              onSubmit={form.handleSubmit(async (data, e) => {
                e?.stopPropagation()
                const { date } = data
                const result = new Date(date)
                await onRecall?.({
                  date: result,
                  status: 'SAVED'
                })
              })}
            >
              <div className="flex flex-col gap-2">
                <div className="flex-1">
                  <Input
                    type="datetime-local"
                    {...form.register('date', {
                      required: true
                    })}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs select-none text-muted-foreground font-medium">
                    Pré-definidos
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      {
                        title: 'Em 30m',
                        onClick: () => {
                          form.setValue(
                            'date',
                            format(addMinutes(new Date(), 30), "yyyy-MM-dd'T'HH:mm")
                          )
                        }
                      },
                      {
                        title: 'Em 1h',
                        onClick: () => {
                          form.setValue(
                            'date',
                            format(addHours(new Date(), 1), "yyyy-MM-dd'T'HH:mm")
                          )
                        }
                      },
                      {
                        title: 'Em 3h',
                        onClick: () => {
                          form.setValue(
                            'date',
                            format(addHours(new Date(), 3), "yyyy-MM-dd'T'HH:mm")
                          )
                        }
                      },
                      {
                        title: 'Amanhã às 9h',
                        onClick: () => {
                          form.setValue(
                            'date',
                            format(
                              addHours(startOfDay(addDays(new Date(), 1)), 9),
                              "yyyy-MM-dd'T'HH:mm"
                            )
                          )
                        }
                      },
                      {
                        title: 'Amanhã às 12h',
                        onClick: () => {
                          form.setValue(
                            'date',
                            format(
                              addHours(startOfDay(addDays(new Date(), 1)), 12),
                              "yyyy-MM-dd'T'HH:mm"
                            )
                          )
                        }
                      },
                      {
                        title: 'Amanhã às 18h',
                        onClick: () => {
                          form.setValue(
                            'date',
                            format(
                              addHours(startOfDay(addDays(new Date(), 1)), 18),
                              "yyyy-MM-dd'T'HH:mm"
                            )
                          )
                        }
                      }
                    ].map((item, i) => (
                      <Button
                        key={`item.${i}`}
                        variant={'outline'}
                        size={'sm'}
                        className="justify-start text-left px-1 h-8 items-center w-full"
                        onClick={item.onClick}
                      >
                        <ClockIcon className="w-3 h-3" />
                        <span className="flex-1 font-medium">{item.title}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button
                  size={'sm'}
                  type={'submit'}
                  disabled={form.formState.isSubmitting}
                >
                  Salvar
                </Button>
              </div>
            </form>
          </Form>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default RecallButton
