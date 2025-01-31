import InterviewerFormProvider from '@/components/interviewer/InterviewerForm/src/InterviewerFormProvider'
import React from 'react'
import QuestionnaireCardForm from '../QuestionnaireCardForm'

const MotorcycleProfileForm: React.FC = () => {
  return (
    <QuestionnaireCardForm title={'Perfil da Motocicleta'}>
      <InterviewerFormProvider
        configs={{
          fields: [
            {
              type: 'grid',
              name: 'motorcycle',
              className: 'grid-cols-3 gap-4',
              fields: [
                {
                  type: 'select',
                  title: 'Modelo',
                  name: 'model',
                  className: 'h-10',
                  options: [
                    {
                      label: 'FAZER 150',
                      value: 'FAZER 150'
                    },
                    {
                      label: 'XTZ 150',
                      value: 'XTZ 150'
                    },
                    {
                      label: 'YBR 150 ED',
                      value: 'YBR 150 ED'
                    }
                  ]
                },
                {
                  type: 'select',
                  title: 'Ano de Fabricação',
                  name: 'manufacturingYear',
                  options: Array.from({ length: 85 })
                    .map((_, i) => ({
                      label: `${1940 + i}`,
                      value: `${1940 + i}`
                    }))
                    .reverse()
                }
              ]
            },
            {
              type: 'number',
              title: 'Qual a quilometragem marcada no hodômetro?',
              placeholder: 'Se não souber coloque 999.999',
              name: 'mileage'
            },
            {
              type: 'number',
              title: 'Quantos km você roda mensalmente, em média?',
              placeholder: 'Se não souber coloque 999.999',
              name: 'monthlyMileage'
            }
          ]
        }}
      />
    </QuestionnaireCardForm>
  )
}

export default MotorcycleProfileForm
