import React, { Suspense } from 'react'
import { InterviewerForm } from '../../types'
import { TextField } from './src/text'
import { InterviewerFormFieldProps } from '../InterviewerFormField'
import { RadioField } from './src/radio'
import { SelectField } from './src/select'
import { CheckboxField } from './src/checkbox'
import { NumberField } from './src/number'
import { CheckboxPercentageField } from './src/checkbox_percentage'
import { TextareaField } from './src/textarea'
import { GridField } from './src/grid'
import { PercentageField } from './src/percentage'
import { RevisionsPricesField } from './src/revisions_prices'
import { UiField } from './src/ui'

export type InterviewerFieldProps = {
  [K in InterviewerForm.Config.Field['type']]: Extract<
    InterviewerForm.Config.Field,
    { type: K }
  > & { id: string }
}

const InterviewerFormFieldRoot: React.FC<InterviewerFormFieldProps> = ({
  field,
  ...rest
}) => {
  const fieldProps = { ...field, ...rest } as any

  if (field.type === 'text') {
    return (
      <Suspense>
        <TextField {...fieldProps} />
      </Suspense>
    )
  }

  if (field.type === 'radio') {
    return (
      <Suspense>
        <RadioField {...fieldProps} />
      </Suspense>
    )
  }

  if (field.type === 'select') {
    return (
      <Suspense>
        <SelectField {...fieldProps} />
      </Suspense>
    )
  }

  if (field.type === 'checkbox') {
    return (
      <Suspense>
        <CheckboxField {...fieldProps} />
      </Suspense>
    )
  }

  if (field.type === 'number') {
    return (
      <Suspense>
        <NumberField {...fieldProps} />
      </Suspense>
    )
  }

  if (field.type === 'checkbox_percentage') {
    return (
      <Suspense>
        <CheckboxPercentageField {...fieldProps} />
      </Suspense>
    )
  }

  if (field.type === 'textarea') {
    return (
      <Suspense>
        <TextareaField {...fieldProps} />
      </Suspense>
    )
  }

  if (field.type === 'grid') {
    return (
      <Suspense>
        <GridField {...fieldProps} />
      </Suspense>
    )
  }

  if (field.type === 'percentage') {
    return (
      <Suspense>
        <PercentageField {...fieldProps} />
      </Suspense>
    )
  }

  if (field.type === 'revisions_prices') {
    return (
      <Suspense>
        <RevisionsPricesField {...fieldProps} />
      </Suspense>
    )
  }

  if (field.type === 'ui') {
    return (
      <Suspense>
        <UiField {...fieldProps} />
      </Suspense>
    )
  }

  return <div />
}

export default InterviewerFormFieldRoot
