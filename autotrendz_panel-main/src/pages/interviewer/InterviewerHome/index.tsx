import InterviewerCard from '@/components/interviewer/InterviewerCard'
import InterviewerHeaderPage from '@/components/interviewer/InterviewerHeaderPage'
import { useListStates } from '@/services/hooks/ymh-questionnaire/useListStates'
import React from 'react'
import { Link } from 'react-router-dom'

const InterviewerHome: React.FC = () => {
  const { data: states } = useListStates()

  return (
    <>
      <InterviewerHeaderPage />
      <div className="w-full max-w-[700px] flex overflow-x-hidden flex-col gap-12">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Selecione um dos estados abaixo</h1>
          <p className="text-sm text-muted-foreground">Selecione</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-20">
          {(states ?? []).map((state, s) => (
            <Link key={`state.${s}`} to={`/${state.id}/questionnaires`}>
              <InterviewerCard title={state.name} description={state.description} />
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default InterviewerHome
