import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { YmhQuestionnaire } from '@/services/YmhQuestionnaire'
import { AvatarIcon, CheckCircledIcon, ClockIcon } from '@radix-ui/react-icons'
import React, { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { BiPhone } from 'react-icons/bi'
import { FaUserLock } from 'react-icons/fa'
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber'
import { Separator } from '@/components/ui/separator'
import RecallButton from './src/RecallButton'

export interface OnRecallProps {
  status: YmhQuestionnaire.SaveInput['status']
  date: Date
}

interface SidebarFormProps {
  contact: YmhQuestionnaire.Contact
  onChangeStatus: (status: YmhQuestionnaire.SaveInput['status']) => void
  onRecall: (props: OnRecallProps) => void | Promise<void>
}

const SidebarForm: React.FC<SidebarFormProps> = ({
  contact,
  onChangeStatus,
  onRecall
}) => {
  const form = useFormContext()

  const phone = useMemo(() => {
    try {
      return PhoneNumberUtil.getInstance().format(
        PhoneNumberUtil.getInstance().parse(contact.phone, 'BR'),
        PhoneNumberFormat.NATIONAL
      )
    } catch (error) {
      return contact.phone
    }
  }, [contact.phone])

  const setStatus = (status: YmhQuestionnaire.SaveInput['status']) => {
    onChangeStatus(status)
  }

  return (
    <div className="flex flex-col h-full w-full overflow-y-auto p-4 gap-8">
      <div className="flex items-center gap-4">
        <Avatar className="w-16 h-16 rounded-xl">
          <AvatarFallback className="border rounded-xl">
            <AvatarIcon className="w-10 h-10" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col flex-1">
          <span className="text-2xl font-bold">{form.watch('contact.name')}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-xl border bg-muted flex items-center justify-center">
          <BiPhone className="w-6 h-6" />
        </div>
        <div className="flex flex-col flex-1">
          <span className="text-xs">Telefone</span>
          <span className="text-lg font-bold">{phone}</span>
        </div>
      </div>
      <Separator />
      <div className="grid grid-cols-1 gap-2">
        {[
          {
            className:
              'text-green-500 border-green-500 hover:bg-green-500 hover:text-green-50',
            label: 'Finalizar com Sucesso',
            onClick: () => {
              setStatus('FINISHED')
            },
            icon: CheckCircledIcon
          },
          {
            className:
              'text-yellow-500 border-yellow-500 hover:bg-yellow-500 hover:text-yellow-50',
            label: 'Finalizar como Ausente',
            onClick: () => {
              setStatus('NOT_REACHABLE')
            },
            icon: ClockIcon
          },
          {
            className:
              'text-red-500 border-red-500 hover:bg-red-500 hover:text-red-50',
            label: 'Não quer participar',
            onClick: () => {
              setStatus('NOT_REACHABLE')
            },
            icon: FaUserLock
          }
        ].map((btn, b) => (
          <Button
            className={cn('px-2 gap-2 py-3 h-auto', btn.className)}
            onClick={btn.onClick}
            key={`action-button.${b}`}
            size={'lg'}
            variant={'outline'}
            type={'button'}
          >
            {btn.icon && <btn.icon className="w-8 h-8" />}
            <span className="flex-1 text-lg truncate font-medium">{btn.label}</span>
          </Button>
        ))}
        <Separator className="my-4" />
        <RecallButton onRecall={onRecall} />
      </div>
    </div>
  )
}

export default SidebarForm
