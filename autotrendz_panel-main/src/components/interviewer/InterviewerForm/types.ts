import { ReactNode } from 'react'
import { UseFormReturn } from 'react-hook-form'

export namespace InterviewerForm {
  export interface FieldProps {
    name: string
    value?: any
    onChange?: (value: any) => void
    label?: string
    description?: string
  }

  export namespace Config {
    export interface BaseField {
      name: string
      title: string
      description?: string
      className?: string
      disabled?: boolean
      onChange?: (value: any, form: UseFormReturn) => void
      onBlur?: (value: any, form: UseFormReturn) => void
      hidden?: (data: any) => boolean
    }

    export type Field =
      | Field$Text
      | Field$Textarea
      | Field$Radio
      | Field$Checkbox
      | Field$Row
      | Field$Select
      | Field$Percentage
      | Field$CheckboxPercentage
      | Field$Percentage
      | Field$RevisionsPrices
      | Field$Grid
      | Field$Ui
      | Field$Number
    export type FieldMap = {
      [K in Field['type']]: Extract<Field, { type: K }>
    }
    export interface Root {
      fields: InterviewerForm.Config.Field[]
    }

    export interface Field$Text extends BaseField {
      type: 'text'
      suffix?: ReactNode
      prefix?: ReactNode
      placeholder?: string
    }

    export interface Field$Textarea extends BaseField {
      type: 'textarea'
      suffix?: ReactNode
      prefix?: ReactNode
      placeholder?: string
    }

    export interface Field$Number extends BaseField {
      type: 'number'
      suffix?: ReactNode
      prefix?: ReactNode
      placeholder?: string
    }

    export interface Field$Ui extends BaseField {
      type: 'ui'
      component: React.ComponentType<Field$Ui>
    }

    export interface Field$Percentage extends BaseField {
      type: 'percentage'
    }

    export interface Field$RevisionsPrices extends BaseField {
      type: 'revisions_prices'
    }

    export interface Option {
      value: string
      label?: React.ReactNode
      description?: React.ReactNode
      /** Significa que o valor é um campo de texto */
      other?: {
        placeholder?: string
      }
    }

    export interface Option$CheckboxPercentage extends Option {
      default?: {
        enabled?: boolean
        percentage?: number
        value?: string
      }
    }

    export interface Field$Radio extends BaseField {
      type: 'radio'
      options: InterviewerForm.Config.Option[]
    }

    export interface Field$Select extends BaseField {
      type: 'select'
      placeholder?: ReactNode
      options: InterviewerForm.Config.Option[]
    }

    export interface Field$Grid extends Omit<BaseField, 'title'> {
      type: 'grid'
      fields: InterviewerForm.Config.Field[]
    }

    export interface Field$CheckboxPercentage extends BaseField {
      type: 'checkbox_percentage'
      placeholder?: ReactNode
      options: InterviewerForm.Config.Option$CheckboxPercentage[]
    }

    export interface Field$Checkbox extends BaseField {
      type: 'checkbox'
      options: InterviewerForm.Config.Option[]
    }

    export interface Field$Row extends BaseField {
      type: 'row'
      fields: InterviewerForm.Config.Field[]
    }
  }
}
