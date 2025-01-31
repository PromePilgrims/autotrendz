import InterviewerFormProvider from '@/components/interviewer/InterviewerForm/src/InterviewerFormProvider'
import React, { useMemo } from 'react'
import MotorcycleProfileForm from '../MotorcycleProfileForm'
import RiderProfileForm from '../RiderProfileForm'
import QuestionnaireCardForm from '../QuestionnaireCardForm'
import ContactForm from '../ContactForm'
import ConditionFormInfo from '../ConditionFormInfo'
import { useFormContext } from 'react-hook-form'
import YmhFixedPriceCard from '../YmhFixedPriceCard'

/**
 * ---
 * true -> O cliente não fez nenhuma revisão na concessionária
 *
 * ---
 *
 * false -> O cliente fez pelo menos uma revisão na concessionária
 */
const isNotRevisionedByDealership = (data: any) => {
  return data.revision?.revisionsDoneAtDealership?.values?.includes('0')
}

const isAllRevisionsDoneByDealership = (data: any) => {
  const revisions = data.revision?.revisionsDoneAtDealership?.values ?? []
  return (
    revisions.includes('all') ||
    ['1', '2', '3', '4'].every((r) => revisions.includes(r))
  )
}

const NonRevisionSurveyForm: React.FC = () => {
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
      {hasContact && (
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
                      'Por que você fez a revisão de acordo com o manual na concessionária?',
                    name: 'revision.reasonForDealershipRevisionAccordingToManual',
                    type: 'checkbox',
                    hidden: (data) => {
                      return isNotRevisionedByDealership(data)
                    },
                    options: [
                      {
                        value: 'A',
                        label: 'Porque minha segurança é importante.'
                      },
                      {
                        value: 'B',
                        label: 'Porque quero manter o valor da moto.'
                      },
                      {
                        value: 'C',
                        label: 'Porque respeito a recomendação da Yamaha.'
                      },
                      {
                        value: 'D',
                        label:
                          'Porque acredito que é o mínimo para deixar a moto funcionando bem.'
                      },
                      {
                        value: 'E',
                        label:
                          'Para reduzir prejuízos com manutenções corretivas (quebras, desgaste etc.).'
                      },
                      {
                        value: 'F',
                        label: 'Outro',
                        other: {
                          placeholder: 'Outro motivo'
                        }
                      }
                    ]
                  },
                  {
                    title:
                      'Qual foi a concessionária onde você fez serviços pela última vez?',
                    name: 'revision.lastDealershipVisited',
                    type: 'text',
                    hidden: (data) => {
                      return isNotRevisionedByDealership(data)
                    }
                  },
                  {
                    title:
                      'Por que você deixou de fazer as revisões na concessionária?',
                    name: 'revision.reasonForStoppingDealershipRevisions',
                    type: 'checkbox',
                    hidden: (data) => {
                      return isAllRevisionsDoneByDealership(data)
                    },
                    options: [
                      {
                        value: 'A',
                        label: 'É caro fazer tudo o que pede.'
                      },
                      {
                        value: 'B',
                        label: 'Só troco o óleo.'
                      },
                      {
                        value: 'C',
                        label: 'Fica longe de casa ou trabalho'
                      },
                      {
                        value: 'D',
                        label: 'Não tem concessionária na cidade.'
                      },
                      {
                        value: 'E',
                        label: 'Fui mal atendido'
                      },
                      {
                        value: 'F',
                        label: 'Tive dificuldades financeiras.'
                      },
                      {
                        value: 'G',
                        label: 'Eu não sabia o que dizia o manual.'
                      },
                      {
                        value: 'H',
                        label: 'Perdi o prazo da revisão'
                      },
                      {
                        value: 'I',
                        label:
                          'Faço a revisão com periodicidade diferente da recomendada.'
                      },
                      {
                        value: 'J',
                        label: 'Porque levo no meu mecânico de confiança'
                      },
                      {
                        value: 'K',
                        label: 'Outro',
                        other: {
                          placeholder: 'Outro motivo'
                        }
                      }
                    ]
                  },
                  {
                    title:
                      'Se você faz a revisão com uma periodicidade diferente, qual seria? (Em tempo ou em km)',
                    name: 'revision.alternativeRevisionPeriod',
                    type: 'radio',
                    className: 'grid-cols-2',
                    hidden: (data) => {
                      const isDiffPeriod =
                        data.revision?.reasonForStoppingDealershipRevisions?.values.includes(
                          'I'
                        )

                      if (!isAllRevisionsDoneByDealership(data) && isDiffPeriod) {
                        return false
                      }

                      return true
                    },
                    options: [
                      {
                        value: 'A',
                        label: 'Em km',
                        description: 'A cada X KMs'
                      },
                      {
                        value: 'B',
                        label: 'Meses',
                        description: 'A cada X meses'
                      }
                    ]
                  },
                  {
                    title: 'A cada quantos KMs você faz a revisão?',
                    name: 'revision.kmRevisionPeriod',
                    type: 'number',
                    hidden: (data) => {
                      const isDiffPeriod =
                        data.revision?.reasonForStoppingDealershipRevisions?.values.includes(
                          'I'
                        )

                      if (!isDiffPeriod || isAllRevisionsDoneByDealership(data)) {
                        return true
                      }

                      return (
                        data.revision?.alternativeRevisionPeriod?.selected !== 'A' ||
                        !data.revision?.alternativeRevisionPeriod?.selected
                      )
                    }
                  },
                  {
                    title: 'A cada quantos meses você faz a revisão?',
                    name: 'revision.monthRevisionPeriod',
                    type: 'number',
                    hidden: (data) => {
                      const isDiffPeriod =
                        data.revision?.reasonForStoppingDealershipRevisions?.values.includes(
                          'I'
                        )

                      if (!isDiffPeriod || isAllRevisionsDoneByDealership(data)) {
                        return true
                      }

                      return (
                        data.revision?.alternativeRevisionPeriod?.selected !== 'B' ||
                        !data.revision?.alternativeRevisionPeriod?.selected
                      )
                    }
                  },
                  {
                    title:
                      'Se houvesse uma oficina autorizada da fábrica na sua cidade, você optaria por ela?',
                    name: 'revision.optForFactoryAuthorizedWorkshop',
                    type: 'radio',
                    className: 'gridc-cols-2',
                    options: [
                      {
                        value: 'A',
                        label: 'Sim'
                      },
                      {
                        value: 'B',
                        label: 'Não'
                      }
                    ],
                    hidden: (data) => {
                      const isDiffPeriod =
                        data.revision?.reasonForStoppingDealershipRevisions?.values.includes(
                          'D'
                        )

                      if (!isAllRevisionsDoneByDealership(data) && isDiffPeriod) {
                        return false
                      }

                      return true
                    }
                  },
                  {
                    title:
                      'Quais fatores te motivariam a ainda continuar frequentando a oficina da concessionária?',
                    name: 'revision.motivatingFactorsToContinueDealership',
                    type: 'checkbox',
                    options: [
                      {
                        value: 'A',
                        label: 'Facilidade em agendar e levar a moto.'
                      },
                      {
                        value: 'B',
                        label: 'Preços mais baixos.'
                      },
                      {
                        value: 'C',
                        label: 'Serviço feito na minha casa/trabalho.'
                      },
                      {
                        value: 'D',
                        label:
                          'Um plano envolvendo todas as revisões quando compro a moto nova.'
                      },
                      {
                        value: 'E',
                        label:
                          'Maior valorização na troca da moto na concessionária.'
                      },
                      {
                        value: 'F',
                        label: 'Outro',
                        other: {
                          placeholder: 'Outro motivo'
                        }
                      }
                    ]
                  },
                  {
                    title:
                      'Você fez algum tipo de revisão depois que deixou a concessionária?',
                    name: 'revision.revisionAfterLeavingDealership',
                    type: 'radio',
                    className: 'grid-cols-2',
                    options: [
                      {
                        value: 'A',
                        label: 'Sim'
                      },
                      {
                        value: 'B',
                        label: 'Não'
                      }
                    ]
                  },
                  {
                    title:
                      'Onde você levou para fazer a revisão depois que deixou a concessionária?',
                    name: 'revision.whereDidYouGoForRevisionAfterDealership',
                    type: 'radio',
                    hidden: (data) => {
                      return (
                        data.revision?.revisionAfterLeavingDealership?.selected ===
                          'B' ||
                        !data.revision?.revisionAfterLeavingDealership?.selected
                      )
                    },
                    options: [
                      {
                        value: 'A',
                        label: 'Oficina mecânica / Centro automotivo'
                      },
                      {
                        value: 'B',
                        label: 'Loja de peças de motos'
                      },
                      {
                        value: 'C',
                        label: 'Eu mesmo fiz'
                      },
                      {
                        value: 'D',
                        label: 'Posto de combustíveis'
                      },
                      {
                        value: 'E',
                        label:
                          'Oficina especializada na troca de óleo de motor (super troca de óleo)'
                      },
                      {
                        value: 'F',
                        label: 'Auto Elétrica'
                      },
                      {
                        value: 'G',
                        label: 'Outro',
                        other: {
                          placeholder: 'Outro lugar'
                        }
                      }
                    ]
                  },
                  {
                    title: 'Por que você escolheu esse lugar para fazer a revisão?',
                    name: 'revision.reasonForChoosingRevisionPlace',
                    type: 'radio',
                    hidden: (data) => {
                      return (
                        data.revision?.revisionAfterLeavingDealership?.selected ===
                          'B' ||
                        !data.revision?.revisionAfterLeavingDealership?.selected
                      )
                    },
                    options: [
                      {
                        value: 'A',
                        label: 'Confiança no mecânico'
                      },
                      {
                        value: 'B',
                        label: 'Preços mais baixos'
                      },
                      {
                        value: 'C',
                        label: 'É perto de casa/trabalho'
                      },
                      {
                        value: 'D',
                        label: 'Já estou acostumado a levar lá'
                      },
                      {
                        value: 'E',
                        label: 'O serviço é bem feito'
                      },
                      {
                        value: 'F',
                        label: 'Tem várias opções de marcas de peças'
                      },
                      {
                        value: 'G',
                        label: 'Outro',
                        other: {
                          placeholder: 'Outro motivo'
                        }
                      }
                    ]
                  },
                  {
                    title: 'Como você mantém sua moto em condições de rodagem?',
                    name: 'revision.howYouMaintainYourMotorcycle',
                    type: 'radio',
                    options: [
                      {
                        value: 'A',
                        label: 'Só troco o óleo.'
                      },
                      {
                        value: 'B',
                        label: 'Só levo no mecânico quando tem problema.'
                      },
                      {
                        value: 'C',
                        label:
                          'Faço manutenções básicas recomendadas por meu mecânico de confiança.'
                      },
                      {
                        value: 'D',
                        label: 'Outro',
                        other: {
                          placeholder: 'Outra forma'
                        }
                      }
                    ],
                    hidden: (data) => {
                      return (
                        data.revision?.revisionAfterLeavingDealership?.selected ===
                          'A' ||
                        !data.revision?.revisionAfterLeavingDealership?.selected
                      )
                    }
                  },
                  {
                    title:
                      'Quais peças você trocou e quais serviços foram feitos na última revisão?',
                    name: 'revision.partsReplacedAndServicesDoneInLastRevision',
                    type: 'checkbox',
                    options: [
                      {
                        value: 'A',
                        label: 'Troca de óleo'
                      },
                      {
                        value: 'B',
                        label: 'Troca de filtros'
                      },
                      {
                        value: 'C',
                        label: 'Troca de velas'
                      },
                      {
                        value: 'D',
                        label: 'Lubrificação de partes móveis'
                      },
                      {
                        value: 'E',
                        label: 'Verificação de itens de desgaste'
                      },
                      {
                        value: 'F',
                        label: 'Esticar corrente'
                      },
                      {
                        value: 'G',
                        label: 'Regular farol'
                      },
                      {
                        value: 'H',
                        label: 'Ajuste da injeção/embreagem/freio'
                      },
                      {
                        value: 'I',
                        label: 'Ajuste de válvulas'
                      },
                      {
                        value: 'J',
                        label: 'Outro',
                        other: {
                          placeholder: 'Outro motivo'
                        }
                      }
                    ],
                    hidden: (data) => {
                      return (
                        data.revision?.revisionAfterLeavingDealership?.selected ===
                          'B' ||
                        !data.revision?.revisionAfterLeavingDealership?.selected
                      )
                    }
                  },
                  {
                    title: 'Você conhece a Revisão Preço Fixo Yamaha?',
                    name: 'revision.awareOfYamahaFixedPriceRevision',
                    type: 'radio',
                    className: 'grid-cols-2',
                    onChange: (v, form) => {
                      if (v === 'A') {
                        form.setValue('revision.explanationAboutFixedPrice', {
                          selected: null
                        })
                      }
                    },
                    options: [
                      {
                        value: 'A',
                        label: 'Sim'
                      },
                      {
                        value: 'B',
                        label: 'Não'
                      }
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
                      'Na hora da entrega da moto, explicaram que a Yamaha oferece revisões com preço fechado e com mão-de-obra gratuita?',
                    name: 'revision.explanationAboutFixedPrice',
                    type: 'radio',
                    className: 'grid-cols-2',
                    options: [
                      {
                        value: 'A',
                        label: 'Sim'
                      },
                      {
                        value: 'B',
                        label: 'Não'
                      }
                    ],
                    hidden: (data) => {
                      return (
                        data.revision?.awareOfYamahaFixedPriceRevision?.selected ===
                          'A' ||
                        !data.revision?.awareOfYamahaFixedPriceRevision?.selected
                      )
                    }
                  },
                  {
                    title:
                      'Na sua opinião, quais benefícios você tem com a Revisão Preço Fixo?',
                    name: 'revision.benefitsOfFixedPrice',
                    type: 'checkbox',
                    options: [
                      {
                        value: 'A',
                        label: 'Saber quanto gastarei em manutenção.',
                        description: 'Saber quanto gastarei em manutenção.'
                      },
                      {
                        value: 'B',
                        label: 'Posso me preparar para a despesa.',
                        description: 'Posso me preparar para a despesa.'
                      },
                      {
                        value: 'C',
                        label: 'É mais econômico.',
                        description: 'É mais econômico.'
                      },
                      {
                        value: 'D',
                        label: 'É mais prático.',
                        description: 'É mais prático.'
                      },
                      {
                        value: 'E',
                        label:
                          'Tenho certeza de que os serviços serão feitos de acordo com o necessário.',
                        description:
                          'Tenho certeza de que os serviços serão feitos de acordo com o necessário.'
                      },
                      {
                        value: 'F',
                        label: 'Posso parcelar os valores.',
                        description: 'Posso parcelar os valores.'
                      },
                      {
                        value: 'G',
                        label: 'Ganho descontos em outros produtos.',
                        description: 'Ganho descontos em outros produtos.'
                      },
                      {
                        value: 'H',
                        label: 'Outro',
                        description: 'Outro',
                        other: {
                          placeholder: 'Descreva o benefício'
                        }
                      }
                    ],
                    hidden: (data) => {
                      return (
                        data.revision?.explanationAboutFixedPrice?.selected === 'B'
                      )
                    }
                  },
                  {
                    title:
                      'Você tem alguma sugestão de melhoria na Revisão Preço Fixo?',
                    name: 'revision.fixedPriceRevisionSuggestions',
                    type: 'textarea',
                    hidden: (data) => {
                      return (
                        data.revision?.explanationAboutFixedPrice?.selected === 'B'
                      )
                    }
                  },
                  {
                    title:
                      'Você sabia que a Yamaha paga a mão-de-obra na primeira e na segunda revisões?',
                    name: 'revision.yamahaCoversLaborForFirstTwo',
                    type: 'radio',
                    className: 'grid-cols-2',
                    options: [
                      {
                        value: 'A',
                        label: 'Sim'
                      },
                      {
                        value: 'B',
                        label: 'Não'
                      }
                    ]
                  },
                  {
                    title:
                      'Qual o valor em Reais que você imagina que a Yamaha paga em cada uma da primeira e segunda revisões?',
                    name: 'revision.costYamahaPaysForEachRevision',
                    type: 'revisions_prices'
                  },
                  {
                    title:
                      'Você prefereria que a Yamaha lhe concedesse um crédito nesse valor para utilizar na 3º ou 4º revisões?',
                    name: 'revision.preferCreditForLaterRevisions',
                    type: 'radio',
                    className: 'grid-cols-2',
                    options: [
                      {
                        value: 'A',
                        label: 'Sim'
                      },
                      {
                        value: 'B',
                        label: 'Não'
                      }
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
                      'Em relação ao preço praticado na revisão atualmente, quanto você acha que custaria a menos essa revisão reduzida?',
                    name: 'revision.estimatedCostReductionPercent',
                    type: 'percentage',
                    className: 'full-width',
                    hidden: (data) => {
                      return (
                        data.revision?.interestedInEngineOnlyRevision?.selected ===
                          'B' ||
                        !data.revision?.interestedInEngineOnlyRevision?.selected
                      )
                    }
                  },
                  {
                    title:
                      'Você optaria desde o início por essa modalidade de garantia?',
                    name: 'revision.optForWarrantyFromStart',
                    type: 'radio',
                    className: 'grid-cols-2',
                    options: [
                      {
                        value: 'A',
                        label: 'Sim'
                      },
                      {
                        value: 'B',
                        label: 'Não'
                      }
                    ],
                    hidden: (data) => {
                      return (
                        data.revision?.interestedInEngineOnlyRevision?.selected ===
                          'B' ||
                        !data.revision?.interestedInEngineOnlyRevision?.selected
                      )
                    }
                  },
                  {
                    title: 'Por que optaria desde o início?',
                    name: 'revision.reasonToOptFromStart',
                    type: 'radio',
                    hidden: (data) => {
                      return (
                        data.revision?.optForWarrantyFromStart?.selected !== 'A' ||
                        !data.revision?.optForWarrantyFromStart?.selected ||
                        data.revision?.interestedInEngineOnlyRevision?.selected ===
                          'B' ||
                        !data.revision?.interestedInEngineOnlyRevision?.selected
                      )
                    },
                    options: [
                      {
                        value: 'A',
                        label: 'Porque será mais barato.',
                        description: 'Porque será mais barato.'
                      },
                      {
                        value: 'B',
                        label: 'Porque me preocupo mais com o motor.',
                        description: 'Porque me preocupo mais com o motor.'
                      },
                      {
                        value: 'C',
                        label: 'Porque os outros itens não dão problema.',
                        description: 'Porque os outros itens não dão problema.'
                      },
                      {
                        value: 'D',
                        label: 'Porque a manutenção principal que faço é no motor.',
                        description:
                          'Porque a manutenção principal que faço é no motor.'
                      },
                      {
                        value: 'E',
                        label: 'Porque só troco o óleo do motor.',
                        description: 'Porque só troco o óleo do motor.'
                      },
                      {
                        value: 'F',
                        label: 'Porque os demais itens faço em outros lugares.',
                        description: 'Porque os demais itens faço em outros lugares.'
                      },
                      {
                        value: 'G',
                        label: 'Outro',
                        description: 'Outro',
                        other: {
                          placeholder: 'Descreva o motivo'
                        }
                      }
                    ]
                  },
                  {
                    title: 'Por que não optaria desde o início?',
                    name: 'revision.reasonToNotOptFromStart',
                    type: 'radio',
                    hidden: (data) => {
                      return (
                        data.revision?.optForWarrantyFromStart?.selected !== 'B' ||
                        !data.revision?.optForWarrantyFromStart?.selected ||
                        data.revision?.interestedInEngineOnlyRevision?.selected ===
                          'B' ||
                        !data.revision?.interestedInEngineOnlyRevision?.selected
                      )
                    },
                    options: [
                      {
                        value: 'A',
                        label: 'Porque me planejo financeiramente.',
                        description: 'Porque me planejo financeiramente.'
                      },
                      {
                        value: 'B',
                        label: 'Podem ocorrer outros problemas no início.',
                        description: 'Podem ocorrer outros problemas no início.'
                      },
                      {
                        value: 'C',
                        label: 'Porque me sinto mais seguro.',
                        description: 'Porque me sinto mais seguro.'
                      },
                      {
                        value: 'D',
                        label:
                          'Se eu decidir vender a moto, quero que ela mantenha a garantia total.',
                        description:
                          'Se eu decidir vender a moto, quero que ela mantenha a garantia total.'
                      },
                      {
                        value: 'E',
                        label: 'Outro',
                        description: 'Outro',
                        other: {
                          placeholder: 'Descreva o motivo'
                        }
                      }
                    ]
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
                      return (
                        data.revision?.optForWarrantyFromStart?.selected !== 'B' ||
                        !data.revision?.optForWarrantyFromStart?.selected ||
                        data.revision?.interestedInEngineOnlyRevision?.selected ===
                          'B' ||
                        !data.revision?.interestedInEngineOnlyRevision?.selected
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

export default NonRevisionSurveyForm
