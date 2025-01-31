import InterviewerFormProvider from '@/components/interviewer/InterviewerForm/src/InterviewerFormProvider'
import React from 'react'
import QuestionnaireCardForm from '../QuestionnaireCardForm'
import axios from 'axios'
import { useToast } from '@/components/ui/use-toast'
import { UseFormReturn } from 'react-hook-form'

const ContactForm: React.FC = () => {
  const { toast } = useToast()

  const onRefreshCEP = (value: any, form: UseFormReturn) => {
    if (!value || value.length !== 8) {
      toast({
        title: 'CEP inválido',
        description: 'O CEP deve conter 8 dígitos'
      })
    } else {
      axios
        .get(`https://brasilapi.com.br/api/cep/v2/${value}`)
        .then((res) => res.data)
        .then((cepData) => {
          if (cepData) {
            toast({
              variant: 'success',
              title: 'CEP Encontrado',
              description: `Endereço: ${cepData.street}, ${cepData.city} - ${cepData.state}`
            })
            form.setValue('contact.address.street', cepData.street)
            form.setValue('contact.address.city', cepData.city)
            form.setValue('contact.address.state', cepData.state)
          } else {
            toast({
              variant: 'destructive',
              title: 'CEP inválido',
              description: 'O CEP informado não foi encontrado'
            })
          }
        })
        .catch((err) => {
          if (axios.isAxiosError(err)) {
            if (err.response?.data) {
              toast({
                variant: 'destructive',
                title: 'CEP inválido',
                description:
                  err.response?.data?.message ?? 'O CEP informado não foi encontrado'
              })
            } else {
              toast({
                variant: 'destructive',
                title: 'CEP inválido',
                description: 'O CEP informado não foi encontrado'
              })
            }
          } else {
            toast({
              variant: 'destructive',
              title: 'CEP inválido',
              description: 'O CEP informado não foi encontrado'
            })
          }
        })
    }
  }

  return (
    <QuestionnaireCardForm title={'Sobre o Entrevistado'}>
      <InterviewerFormProvider
        configs={{
          fields: [
            {
              type: 'grid',
              name: 'contact',
              className: 'gap-6',
              fields: [
                {
                  type: 'text',
                  name: 'name',
                  title: 'Nome Completo',
                  placeholder: 'Digitar nome completo'
                },
                {
                  type: 'text',
                  name: 'email',
                  title: 'E-mail',
                  placeholder: 'Digitar e-mail'
                },
                {
                  type: 'text',
                  name: 'address.zipCode',
                  title: 'CEP',
                  placeholder: 'Digitar CEP',
                  onBlur: (value, form) => {
                    onRefreshCEP(value, form)
                  },
                  onChange: (value, form) => {
                    if (value && value.length === 8) {
                      onRefreshCEP(value, form)
                    }
                  }
                },
                {
                  type: 'text',
                  name: 'address.street',
                  title: 'Endereço',
                  disabled: true,
                  placeholder: 'Digitar endereço'
                },
                {
                  type: 'text',
                  name: 'address.number',
                  title: 'Número',
                  placeholder: 'Nº da residência'
                },
                {
                  type: 'text',
                  name: 'address.complement',
                  title: 'Complemento',
                  placeholder: 'Digitar complemento (se tiver)'
                },
                {
                  type: 'text',
                  name: 'address.state',
                  title: 'Estado',
                  disabled: true,
                  placeholder: 'Digitar estado'
                },
                {
                  type: 'text',
                  name: 'address.city',
                  title: 'Cidade',
                  disabled: true,
                  placeholder: 'Digitar cidade'
                }
              ]
            }
          ]
        }}
      />
    </QuestionnaireCardForm>
  )
}

export default ContactForm
