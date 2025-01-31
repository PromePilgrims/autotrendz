import React from 'react'
import { InterviewerFieldProps } from '../..'
import { useField } from '@/components/interviewer/InterviewerForm/hooks/useField'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import CurrencyInput from 'react-currency-input-field'

interface Value {
  firstRevision?: string
  secondRevision?: string
}

const Field: React.FC<InterviewerFieldProps['revisions_prices']> = ({
  name,
  className
}) => {
  const { value, onChange, formItemId } = useField<Value>(name)

  return (
    <>
      <div className={cn('grid grid-cols-2 gap-4', className)}>
        {[
          {
            name: 'firstRevision' as const,
            label: '1ª Revisão',
            placeholder: 'R$ 0,00',
            id: formItemId
          },
          {
            name: 'secondRevision' as const,
            label: '2ª Revisão',
            placeholder: 'R$ 0,00'
          }
        ].map((item, i) => (
          <div key={i} className="flex flex-col gap-1">
            <label
              className="font-bold text-sm"
              htmlFor={item.id ?? `field.${item.name}.${formItemId}`}
            >
              {item.label}
            </label>
            <CurrencyInput
              type="text"
              value={value?.[item.name] as any}
              intlConfig={{
                locale: 'pt-BR',
                currency: 'BRL'
              }}
              className="h-14 text-lg font-bold"
              id={item.id ?? `field.${item.name}.${formItemId}`}
              placeholder={item.placeholder}
              decimalsLimit={2}
              customInput={Input}
              onValueChange={(v) => {
                onChange({
                  ...value,
                  [item.name]: v
                })
              }}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default Field

export const RevisionsPricesField = React.lazy(() => import('.'))
