import InterviewerFormProvider from '@/components/interviewer/InterviewerForm/src/InterviewerFormProvider'
import SelectPlaceholder from '@/components/interviewer/InterviewerForm/ui-helpers/SelectPlaceholder'
import React from 'react'
import QuestionnaireCardForm from '../QuestionnaireCardForm'

const RiderProfileForm: React.FC = () => {
  return (
    <QuestionnaireCardForm
      title={'Perfil do Motociclista'}
      description={'Preencha as informações do motociclista abaixo.'}
    >
      <InterviewerFormProvider
        configs={{
          fields: [
            {
              type: 'radio',
              name: 'rider.gender',
              title: 'Gênero',
              className: 'grid-cols-2',
              options: [
                {
                  label: 'Masculino',
                  description: 'Masculino',
                  value: 'M'
                },
                {
                  label: 'Feminino',
                  description: 'Feminino',
                  value: 'F'
                }
              ]
            },
            {
              type: 'number',
              name: 'rider.age',
              title: 'Idade',
              description: 'Informe a idade do cliente',
              suffix: 'anos',
              placeholder: 'Ex: 25'
            },
            {
              type: 'select',
              name: 'rider.occupation',
              title: 'Ocupação',
              description: 'Selecione a ocupação do cliente',
              placeholder: (
                <SelectPlaceholder
                  title={'Selecione a ocupação do cliente'}
                  description={'ou preencha outra ocupação'}
                />
              ),
              options: [
                {
                  value: 'A',
                  label: 'Autônomo',
                  description: 'Trabalha por conta própria'
                },
                {
                  value: 'B',
                  label: 'Funcionário Público',
                  description: 'Funcionário público'
                },
                {
                  value: 'C',
                  label: 'Empresário',
                  description: 'Comércio/serviço/indústria'
                },
                {
                  value: 'D',
                  label: 'Diretor',
                  description:
                    'Diretor, vice-presidente ou presidente de empresa privada'
                },
                {
                  value: 'E',
                  label: 'Gerente',
                  description: 'Gerente ou Supervisor de empresa privada'
                },
                {
                  value: 'F',
                  label: 'Funcionário',
                  description: 'Funcionário de empresa privada'
                },
                {
                  value: 'G',
                  label: 'Outro',
                  description: 'Preencha outra ocupação',
                  other: {
                    placeholder: 'Preencha outra ocupação'
                  }
                }
              ]
            },
            {
              type: 'text',
              title: 'Qual sua renda familiar?',
              description: 'Incluindo todos que moram na sua residência?',
              name: 'rider.income',
              placeholder: 'Ex: R$ 2.500,00'
            },
            {
              type: 'radio',
              name: 'rider.weekDaysUsage',
              title: 'Quantos dias por semana você usa a moto?',
              className: 'grid-cols-2',
              options: [
                {
                  label: 'Um ou Dois',
                  description: 'No máximos 2 dias',
                  value: '1-2'
                },
                {
                  label: 'Três ou Quatro',
                  description: 'No máximos 4 dias',
                  value: '3-4'
                },
                {
                  label: 'Cinco ou Seis',
                  description: 'No máximos 6 dias',
                  value: '5-6'
                },
                {
                  label: 'Todos os Dias',
                  description: 'Todos os dias',
                  value: '7'
                }
              ]
            },
            {
              type: 'checkbox_percentage',
              name: 'rider.usage',
              title: 'Utiliza sua moto para:',
              options: [
                {
                  value: 'A',
                  label: 'Trabalho',
                  description: 'Transporte / entregas de moto, profissionalmente',
                  default: {
                    enabled: true,
                    percentage: 10
                  }
                },
                {
                  value: 'B',
                  label: 'Lazer',
                  description: 'Passeios de moto, sem fins profissionais',
                  default: {
                    enabled: true,
                    percentage: 10
                  }
                },
                {
                  label: 'Locomoção Pessoal',
                  value: 'C',
                  description: 'Deslocamentos pessoais, sem fins profissionais',
                  default: {
                    enabled: true,
                    percentage: 10
                  }
                },
                {
                  label: 'Transporte de Passageiros',
                  description: 'Profissionalmente (Mototáxi)',
                  value: 'D',
                  default: {
                    enabled: true,
                    percentage: 10
                  }
                },
                {
                  label: 'Outras Utilizações',
                  description: 'Outras utilizações da moto',
                  value: 'E',
                  default: {
                    enabled: true,
                    percentage: 10
                  }
                }
              ]
            }
          ]
        }}
      />
    </QuestionnaireCardForm>
  )
}

export default RiderProfileForm
