import { useFormField } from '@/components/ui/form'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useInterfiewFieldsStore } from '../src/InterviewerFormProvider/store'

export function useField<T = any>(name: string) {
  const { error, formItemId, isDirty, invalid } = useFormField()
  const form = useFormContext()
  const fieldData = useInterfiewFieldsStore((state) =>
    state.fields.find((field) => field.name === name)
  )

  const [isHidden, setHidden] = useState(false)

  const value: T = form.watch(name)
  const onChange = (value: T) => form.setValue(name, value)

  useEffect(() => {
    if (fieldData && fieldData.hidden) {
      setHidden(fieldData.hidden!(form.getValues()))

      const subscription = form.watch(() => {
        setHidden(fieldData.hidden!(form.getValues()))
      })

      return () => {
        subscription.unsubscribe()
      }
    }
  }, [name, fieldData])

  return { value, onChange, formItemId, isDirty, invalid, error, isHidden, form }
}
