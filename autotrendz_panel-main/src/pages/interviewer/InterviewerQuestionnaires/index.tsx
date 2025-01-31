import InterviewerCard from '@/components/interviewer/InterviewerCard'
import InterviewerHeaderPage from '@/components/interviewer/InterviewerHeaderPage'
import { Button } from '@/components/ui/button'
import { useListQuestionnairesForms } from '@/services/hooks/ymh-questionnaire/useListQuestionnairesForms'
import { useShowState } from '@/services/hooks/ymh-questionnaire/useShowState'
import { CaretLeftIcon } from '@radix-ui/react-icons'
import React from 'react'
import { Link, useParams } from 'react-router-dom'

const InterviewerQuestionnaires: React.FC = () => {
  const { stateId } = useParams()
  const { data: questionnaires } = useListQuestionnairesForms(stateId!)
  const { data: state } = useShowState(stateId!)

  return (
    <>
      <InterviewerHeaderPage />
      <div className="w-full max-w-[700px] flex flex-col gap-12">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">
            Selecione um dos questionários abaixo
          </h1>
          <p className="text-sm text-muted-foreground">
            Ao iniciar, você receberá informações de contatos para entrar em contato
            e iniciar a pesquisa
          </p>
          <div className="flex justify-start mt-4">
            <Button variant={'outline'} className="gap-2 pr-8 h-auto" asChild>
              <Link to={'/'}>
                <CaretLeftIcon className="w-10 h-10" />
                <div className="flex flex-col flex-1 items-start">
                  <span className="text-sm font-bold">
                    {state?.name ?? 'Localização'}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Trocar Localidade
                  </span>
                </div>
              </Link>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {(questionnaires ?? []).map((questionnaire, s) => (
            <Link
              key={`state.${s}`}
              to={`/${stateId}/questionnaires/${questionnaire.name}`}
            >
              <InterviewerCard
                title={questionnaire.title}
                description={questionnaire.description}
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default InterviewerQuestionnaires
