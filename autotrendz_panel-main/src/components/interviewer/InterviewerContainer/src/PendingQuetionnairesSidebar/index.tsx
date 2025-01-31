import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import YmhQuestionnaire from '@/services/YmhQuestionnaire'
import { CaretRightIcon, ClockIcon } from '@radix-ui/react-icons'
import { useQuery } from '@tanstack/react-query'
import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import React, { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'

const PendingQuetionnairesSidebar: React.FC = () => {
  const { pathname } = useLocation()
  const query = useQuery({
    queryKey: ['ymh-questionnaire', 'pending-quetionnaires'],
    queryFn: async () => {
      return YmhQuestionnaire.loadQuestionnaires()
    }
  })

  const questionnaires = useMemo(() => {
    return query?.data ?? []
  }, [query])

  return (
    <>
      <div
        className={cn(
          'w-[340px] transition-all shrink-0 h-screen bg-muted flex flex-col',
          questionnaires.length <= 0 && !query.isLoading ? '-mr-[340px]' : '-mr-0'
        )}
      >
        <div className="w-full h-14 bg-border flex items-center px-4">
          <span className="text-sm font-bold">Questionários Pendentes</span>
        </div>
        <div className="flex-1 flex flex-col border-l overflow-hidden">
          <div className="p-4 overflow-y-auto">
            {questionnaires
              .filter((v) => !!v.recall_date)
              .sort((a, b) => {
                return (
                  new Date(a.recall_date!).getTime() -
                  new Date(b.recall_date!).getTime()
                )
              })
              .map((pendingContact, p) => (
                <div
                  className="flex flex-col gap-2 mb-3 rounded-lg px-4 py-2 bg-background shadow-lg"
                  key={`pending.${p}`}
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 flex-1">
                        <span className="text-sm font-bold">
                          {pendingContact.interviewee.name}
                        </span>
                        <span
                          className={cn(
                            'text-xs font-bold',
                            pendingContact.interviewee.made_revision
                              ? 'text-green-500'
                              : 'text-red-500'
                          )}
                        >
                          {pendingContact.interviewee.made_revision
                            ? 'Fez Revisão'
                            : 'Não fez Revisão'}
                        </span>
                      </div>
                      {!pathname.endsWith(pendingContact.id) && (
                        <Button
                          size={'sm'}
                          variant={'outline'}
                          className="h-6 px-1.5 items-center"
                          asChild
                        >
                          <Link to={`/questionnaire/${pendingContact.id}`}>
                            <span className="flex-1 font-medium text-muted-foreground">
                              Retomar
                            </span>
                            <CaretRightIcon className="w-4 h-4 text-muted-foreground" />
                          </Link>
                        </Button>
                      )}
                    </div>
                    <div className="flex">
                      <div className="flex flex-col flex-1">
                        <span className="text-xs">Telefone</span>
                        <span className="text-sm font-bold">
                          {pendingContact.interviewee.phone}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center gap-2">
                    <div className="flex gap-1">
                      {new Date(pendingContact.recall_date!).getTime() <
                      new Date().getTime() ? (
                        <span className="text-xs font-bold text-red-500">
                          Atrasado
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-green-500">
                          {formatDistance(
                            new Date(pendingContact.recall_date!),
                            new Date(),
                            {
                              locale: ptBR,
                              addSuffix: true
                            }
                          )}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center">
                      <ClockIcon className="w-4 h-4 mr-2" />
                      <span>
                        {new Date(pendingContact.recall_date!).toLocaleString(
                          'pt-BR',
                          {
                            day: 'numeric',
                            month: 'numeric',
                            year: 'numeric',
                            minute: 'numeric',
                            hour: 'numeric'
                          }
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default PendingQuetionnairesSidebar
