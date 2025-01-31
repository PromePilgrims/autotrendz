import InterviewerHeaderPage from '@/components/interviewer/InterviewerHeaderPage'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Link, useParams } from 'react-router-dom'
import { useAvailableInterviewee } from '@/services/hooks/ymh-questionnaire/useAvailableInterviewee'
import { ContactProvider } from '@/contexts/ContactContext'
import QuestionnaireForm from './src/QuestionnaireForm'
import SidebarForm from './src/SidebarForm'
import { toast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { CaretLeftIcon } from '@radix-ui/react-icons'
import { useQueryClient } from '@tanstack/react-query'
import { useSaveQuestionnaire } from '@/services/hooks/ymh-questionnaire/useSaveQuestionnaire'

const InterviewerQuestionnaire: React.FC = () => {
  const form = useForm()
  const queryClient = useQueryClient()
  const { stateId, questionnaireId } = useParams()

  const {
    data: interviewee,
    isLoading,
    isRefetching,
    refetch
  } = useAvailableInterviewee(stateId as any, questionnaireId as any)

  const saveForm = useSaveQuestionnaire({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['ymh-questionnaire', 'pending-quetionnaires']
      })
      await refetch()
    }
  })

  useEffect(() => {
    form.reset({
      contact: interviewee
    })
  }, [interviewee])

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({
        queryKey: ['ymh-questionnaire', 'available-interviewee']
      })
    }
  }, [])

  const onSubmit = async ({ status, recall_date, ...data }: any) => {
    console.log('onSubmit', data)
    await saveForm.mutateAsync({
      questionnaire: JSON.stringify(data),
      interviewee_id: interviewee?.id!,
      status,
      recall_date
    })
    toast({
      title: 'Formulário enviado com sucesso',
      description: 'Veja o console.log para ver os dados enviados'
    })
  }

  if (!stateId || !questionnaireId) {
    return null
  }

  return (
    <>
      <ContactProvider contact={interviewee!}>
        <InterviewerHeaderPage className="mb-0" />

        {isLoading || isRefetching || !interviewee ? (
          <div className="flex flex-col flex-1 w-full items-center justify-center">
            <div className="flex flex-col max-w-[300px] w-full gap-4 items-center text-center animate-pulse">
              <div className="w-32 h-32 rounded-full border-8 border-brand/40 animate-spin border-b-brand duration-1000"></div>
              <span>Aguarde enquanto carregamos o contato...</span>
            </div>
            <Button variant={'destructive'} className="mt-8" asChild>
              <Link to={`/${stateId}/questionnaires`}>Cancelar e Voltar</Link>
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form className="w-full flex flex-1 relative">
              <ResizablePanelGroup
                direction="horizontal"
                className="h-full w-full absolute left-0 top-0"
              >
                <ResizablePanel>
                  <div className="overflow-y-auto max-h-full p-4">
                    <div className="w-full max-w-[700px] mx-auto flex flex-col">
                      <div className="flex flex-col gap-6">
                        <div className="flex flex-row justify-start">
                          <Button variant={'outline'} asChild>
                            <Link to={`/${stateId}/questionnaires`}>
                              <CaretLeftIcon className="w-6 h-6" />
                              <span>Voltar</span>
                            </Link>
                          </Button>
                        </div>
                        <QuestionnaireForm name={questionnaireId as any} />
                      </div>
                    </div>
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={30} maxSize={30} minSize={20}>
                  <SidebarForm
                    contact={interviewee}
                    onChangeStatus={(status) => {
                      form.setValue('status', status)
                      onSubmit(form.getValues())
                    }}
                    onRecall={async ({ status, date }) => {
                      form.setValue('status', status)
                      form.setValue('recall_date', date.toISOString())
                      onSubmit(form.getValues())
                    }}
                  />
                </ResizablePanel>
              </ResizablePanelGroup>
            </form>
          </Form>
        )}
      </ContactProvider>
    </>
  )
}

export default InterviewerQuestionnaire
