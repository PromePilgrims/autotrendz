import InterviewerFormProvider from '@/components/interviewer/InterviewerForm/src/InterviewerFormProvider'
import React, { useMemo } from 'react'
import MotorcycleProfileForm from '../MotorcycleProfileForm'
import RiderProfileForm from '../RiderProfileForm'
import QuestionnaireCardForm from '../QuestionnaireCardForm'
import ContactForm from '../ContactForm'
import ConditionFormInfo from '../ConditionFormInfo'
import { useFormContext } from 'react-hook-form'
import YmhFixedPriceCard from '../YmhFixedPriceCard'

const RevisionSurveyForm: React.FC = () => {
  const form = useFormContext()
  const contact = form.watch('contact')
  const hasContact = useMemo(() => {
    return (
      !!contact?.name &&
      !!contact?.email &&
      !!contact?.address &&
      !!contact?.address?.zipCode &&
      contact.address.zipCode.length === 8
    )
  }, [
    contact,
    contact?.name,
    contact?.email,
    contact?.address,
    contact?.address?.zipCode
  ])

  return (
    <>
      <ContactForm />
      {!!hasContact && (
        <>
          <ConditionFormInfo />
          <RiderProfileForm />
          <MotorcycleProfileForm />
          <QuestionnaireCardForm
            title={'Revisão'}
            description={'Preencha as informações sobre a revisão da moto.'}
          >
            <InterviewerFormProvider
              configs={{
                fields: [
                  {
                    title: 'Quais revisões você fez na concessionária?',
                    name: 'revision.revisionsDoneAtDealership',
                    type: 'checkbox',
                    className: 'grid-cols-3',
                    onChange: (v, form) => {
                      const lastValue = v?.values?.pop()
                      if (lastValue === 'all' || lastValue === '0') {
                        form.setValue('revision.revisionsDoneAtDealership', {
                          ...v,
                          values: [lastValue]
                        })
                      } else {
                        form.setValue('revision.revisionsDoneAtDealership', {
                          ...v,
                          values: [
                            ...v?.values?.filter(
                              (i: any) => !['all', '0'].includes(i)
                            ),
                            lastValue
                          ]
                        })
                      }
                    },
                    options: [
                      {
                        label: 'Primeira',
                        value: '1'
                      },
                      {
                        label: 'Segunda',
                        value: '2'
                      },
                      {
                        label: 'Terceira',
                        value: '3'
                      },
                      {
                        label: 'Quarta',
                        value: '4'
                      },
                      {
                        label: 'Nenhuma',
                        description: 'Nunca fiz revisão na concessionária',
                        value: '0'
                      },
                      {
                        label: 'Todas',
                        description: 'Fiz todas as revisões na concessionária',
                        value: 'all'
                      }
                    ]
                  },
                  {
                    title:
                      'Por qual motivo você realiza as revisões na moto de acordo com o manual?',
                    name: 'revision.reasonForManualRevision',
                    type: 'checkbox',
                    className: 'grid-cols-2',
                    options: [
                      { value: 'A', label: 'Manter a garantia da moto' },
                      { value: 'B', label: 'Garantir a minha segurança' },
                      { value: 'C', label: 'Valorizar a moto na revenda' },
                      { value: 'D', label: 'Aumentar a vida útil da moto' },
                      {
                        value: 'E',
                        label: 'Reduzir prejuízos com manutenções corretivas'
                      },
                      {
                        value: 'F',
                        label: 'Outro',
                        other: { placeholder: 'Outro motivo' }
                      }
                    ]
                  },
                  {
                    title:
                      'Por que você escolhe a concessionária para fazer as revisões em sua moto?',
                    name: 'revision.reasonForDealershipChoice',
                    type: 'checkbox',
                    className: 'grid-cols-2',
                    options: [
                      { value: 'A', label: 'Confio na empresa' },
                      { value: 'B', label: 'Tem as peças que preciso' },
                      { value: 'C', label: 'Os serviços são bem feitos' },
                      { value: 'D', label: 'Gosto do atendimento' },
                      { value: 'E', label: 'É perto da minha casa ou trabalho' },
                      { value: 'F', label: 'Tem preços justos' },
                      { value: 'G', label: 'Tem horários convenientes' },
                      {
                        value: 'H',
                        label: 'Outro',
                        other: { placeholder: 'Outro...' }
                      }
                    ]
                  },
                  {
                    title:
                      'Quais fatores te motivariam a ainda continuar frequentando a oficina da concessionária?',
                    name: 'revision.motivationalFactorsForDealership',
                    type: 'checkbox',
                    className: 'grid-cols-2',
                    options: [
                      {
                        value: 'A',
                        label: 'Facilidade em agendar e levar a moto'
                      },
                      { value: 'B', label: 'Preços mais baixos' },
                      {
                        value: 'C',
                        label: 'Serviço feito na minha casa/trabalho'
                      },
                      {
                        value: 'D',
                        label:
                          'Um plano envolvendo todas as revisões quando compro a moto nova'
                      },
                      {
                        value: 'E',
                        label: 'Maior valorização na troca da moto na concessionária'
                      },
                      {
                        value: 'F',
                        label: 'Outro',
                        other: { placeholder: 'Outro...' }
                      }
                    ]
                  },
                  {
                    title: 'Você conhece a Revisão Preço Fixo Yamaha?',
                    name: 'revision.knowledgeAboutFixedPrice',
                    type: 'radio',
                    className: 'grid-cols-2',
                    options: [
                      { value: 'A', label: 'Sim' },
                      { value: 'B', label: 'Não' }
                    ]
                  },
                  {
                    type: 'ui',
                    name: 'revision.explain',
                    title: '',
                    component: () => <YmhFixedPriceCard />
                  },
                  {
                    title:
                      'Na hora da entrega da moto, explicaram que a Yamaha oferece revisões com preço fechado e com mão-de-obra paga pela Yamaha nas duas primeiras?',
                    name: 'revision.explanationAboutFixedPrice',
                    type: 'radio',
                    hidden: (data) => {
                      if (!data.revision?.knowledgeAboutFixedPrice) return true

                      return data.revision.knowledgeAboutFixedPrice?.selected === 'A'
                    },
                    className: 'grid-cols-2',
                    options: [
                      { value: 'A', label: 'Sim' },
                      { value: 'B', label: 'Não' }
                    ]
                  },
                  {
                    title:
                      'Na sua opinião, quais benefícios você tem com a Revisão Preço Fixo?',
                    name: 'revision.benefitsOfFixedPrice',
                    type: 'checkbox',
                    className: 'grid-cols-2',
                    hidden: (data) => {
                      if (data.revision) {
                        return (
                          (data.revision.knowledgeAboutFixedPrice?.selected ===
                            'B' ||
                            !data.revision.knowledgeAboutFixedPrice?.selected) &&
                          (data.revision.explanationAboutFixedPrice?.selected ===
                            'B' ||
                            !data.revision.explanationAboutFixedPrice?.selected)
                        )
                      }

                      return false
                    },
                    options: [
                      {
                        value: 'A',
                        label: 'Saber quanto gastarei em manutenção'
                      },
                      {
                        value: 'B',
                        label: 'Posso me preparar para a despesa'
                      },
                      { value: 'C', label: 'É mais econômico' },
                      { value: 'D', label: 'É mais prático' },
                      {
                        value: 'E',
                        label:
                          'Tenho certeza de que os serviços serão feitos de acordo com o necessário'
                      },
                      {
                        value: 'F',
                        label: 'Posso parcelar os valores'
                      },
                      {
                        value: 'G',
                        label: 'Ganho descontos em outros produtos'
                      },
                      {
                        value: 'H',
                        label: 'Outro',
                        other: { placeholder: 'Outro...' }
                      }
                    ]
                  },
                  {
                    title:
                      'Você tem alguma sugestão de melhoria na Revisão Preço Fixo?',
                    name: 'revision.suggestionsForImprovement',
                    type: 'textarea',
                    className: 'full-width',
                    hidden: (data) => {
                      /**
                       * Esconder qnd:
                       * knowledgeAboutFixedPrice === B && explanationAboutFixedPrice === B
                       */

                      if (data.revision) {
                        return (
                          (data.revision.knowledgeAboutFixedPrice?.selected ===
                            'B' ||
                            !data.revision.knowledgeAboutFixedPrice?.selected) &&
                          (data.revision.explanationAboutFixedPrice?.selected ===
                            'B' ||
                            !data.revision.explanationAboutFixedPrice?.selected)
                        )
                      }

                      return false
                    }
                  },
                  {
                    title:
                      'Você sabia que a Yamaha paga a mão-de-obra na primeira e na segunda revisões?',
                    name: 'revision.knowledgeAboutLaborCost',
                    type: 'radio',
                    className: 'grid-cols-2',
                    options: [
                      { value: 'A', label: 'Sim' },
                      { value: 'B', label: 'Não' }
                    ]
                  },
                  {
                    title:
                      'Qual o valor em Reais que você imagina que a Yamaha paga em cada uma da primeira e segunda revisões?',
                    name: 'revision.estimatedCostForFirstTwoRevisions',
                    type: 'revisions_prices'
                  },
                  {
                    title:
                      'Você prefereria que a Yamaha lhe concedesse um crédito nesse valor para utilizar na 3º ou 4º revisões?',
                    name: 'revision.preferCreditForLaterRevisions',
                    type: 'radio',
                    className: 'grid-cols-2',
                    options: [
                      { value: 'A', label: 'Sim' },
                      { value: 'B', label: 'Não' }
                    ]
                  },
                  {
                    title:
                      'Você se interessaria se houvesse uma revisão com itens de motor, com um valor reduzido e garantia apenas do motor?',
                    name: 'revision.interestedInEngineOnlyRevision',
                    type: 'radio',
                    className: 'grid-cols-2',
                    options: [
                      { value: 'A', label: 'Sim' },
                      { value: 'B', label: 'Não' }
                    ]
                  },
                  {
                    title:
                      'Em relação ao preço praticado na revisão atualmente, quanto você acha que custaria a menos essa revisão reduzida (em percentual)?',
                    name: 'revision.estimatedCostReduction',
                    type: 'percentage',
                    className: 'full-width',
                    hidden: (data) => {
                      if (!data.revision?.interestedInEngineOnlyRevision) return true
                      return (
                        data.revision.interestedInEngineOnlyRevision?.selected ===
                        'B'
                      )
                    }
                  },
                  {
                    title:
                      'Você optaria desde o início por essa modalidade de garantia?',
                    name: 'revision.initialOptionForWarrantyType',
                    type: 'radio',
                    className: 'grid-cols-2',
                    options: [
                      { value: 'A', label: 'Sim' },
                      { value: 'B', label: 'Não' }
                    ],
                    hidden: (data) => {
                      if (!data.revision?.interestedInEngineOnlyRevision) return true
                      return (
                        data.revision.interestedInEngineOnlyRevision?.selected ===
                        'B'
                      )
                    }
                  },
                  {
                    title: 'Por que optaria desde o início?',
                    name: 'revision.reasonsForInitialOption',
                    type: 'checkbox',
                    className: 'grid-cols-2',
                    options: [
                      { value: 'A', label: 'Porque será mais barato' },
                      {
                        value: 'B',
                        label: 'Porque me preocupo mais com o motor'
                      },
                      {
                        value: 'C',
                        label: 'Porque os outros itens não dão problema'
                      },
                      {
                        value: 'D',
                        label: 'Porque a manutenção principal que faço é no motor'
                      },
                      {
                        value: 'E',
                        label: 'Porque só troco o óleo do motor'
                      },
                      {
                        value: 'F',
                        label: 'Porque os demais itens faço em outros lugares'
                      },
                      {
                        value: 'G',
                        label: 'Outro',
                        other: { placeholder: 'Outro...' }
                      }
                    ],
                    hidden: (data) => {
                      if (!data.revision?.interestedInEngineOnlyRevision) return true

                      if (
                        data.revision.interestedInEngineOnlyRevision?.selected ===
                        'B'
                      ) {
                        return true
                      }

                      if (!data.revision?.initialOptionForWarrantyType) return true
                      return (
                        data.revision.initialOptionForWarrantyType?.selected === 'B'
                      )
                    }
                  },
                  {
                    title: 'Por que não optaria desde o início?',
                    name: 'revision.reasonsAgainstInitialOption',
                    type: 'checkbox',
                    className: 'grid-cols-2',
                    options: [
                      {
                        value: 'A',
                        label: 'Porque me planejo financeiramente'
                      },
                      {
                        value: 'B',
                        label: 'Podem ocorrer outros problemas no início'
                      },
                      { value: 'C', label: 'Porque me sinto mais seguro' },
                      {
                        value: 'D',
                        label:
                          'Se eu decidir vender a moto, quero que ela mantenha a garantia total'
                      },
                      {
                        value: 'E',
                        label: 'Outro',
                        other: { placeholder: 'Outro...' }
                      }
                    ],
                    hidden: (data) => {
                      // Hidden if not interested in engine only revision or if initial option is yes
                      if (!data.revision?.interestedInEngineOnlyRevision) return true

                      if (
                        data.revision.interestedInEngineOnlyRevision?.selected ===
                        'B'
                      ) {
                        return true
                      }

                      if (!data.revision?.initialOptionForWarrantyType) return true
                      return (
                        data.revision.initialOptionForWarrantyType?.selected === 'A'
                      )
                    }
                  },
                  {
                    title:
                      'Depois de quanto tempo de uso da moto você optaria pela modalidade de garantia só do motor?',
                    name: 'revision.timeBeforeOptingForEngineWarranty',
                    type: 'number',
                    className:
                      'max-w-[400px] h-14 [&_button]:text-base [&_input]:text-base',
                    suffix: 'meses',
                    placeholder: 'Ex: 12',
                    hidden: (data) => {
                      if (!data.revision?.interestedInEngineOnlyRevision) return true

                      if (
                        data.revision.interestedInEngineOnlyRevision?.selected ===
                        'B'
                      ) {
                        return true
                      }

                      if (!data.revision?.initialOptionForWarrantyType) return true

                      return (
                        data.revision.initialOptionForWarrantyType?.selected === 'A'
                      )
                    }
                  }
                ]
              }}
            />
          </QuestionnaireCardForm>
        </>
      )}
    </>
  )
}

export default RevisionSurveyForm
