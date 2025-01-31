import InterviewerHeaderPage from '@/components/interviewer/InterviewerHeaderPage'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable'
import { useToast } from '@/components/ui/use-toast'
import { ContactProvider } from '@/contexts/ContactContext'
import YmhQuestionnaire from '@/services/YmhQuestionnaire'
import { useSaveQuestionnaire } from '@/services/hooks/ymh-questionnaire/useSaveQuestionnaire'
import { CaretLeftIcon } from '@radix-ui/react-icons'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import QuestionnaireForm from '../InterviewerQuestionnaire/src/QuestionnaireForm'
import SidebarForm from '../InterviewerQuestionnaire/src/SidebarForm'

const InterviewerQuestionnaireRecall: React.FC = () => {
  const form = useForm()
  const to = useNavigate()
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { questionnaireId } = useParams()
  const questionnaireData = useQuery({
    queryKey: ['questionnaires', questionnaireId],
    queryFn: async () => {
      return YmhQuestionnaire.show(questionnaireId!)
    },
    enabled: false
  })

  const saveForm = useSaveQuestionnaire({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['ymh-questionnaire', 'pending-quetionnaires']
      })
    }
  })

  const type = useMemo(() => {
    return questionnaireData.data?.interviewee.made_revision
      ? 'revision'
      : 'non_revision'
  }, [questionnaireData])

  const interviewee = useMemo(() => {
    return questionnaireData.data?.interviewee
  }, [questionnaireData])

  useEffect(() => {
    if (questionnaireData.data && !form.getValues('questionnaire')) {
      form.reset({
        ...questionnaireData.data.questionnaire,
        contact: {
          ...questionnaireData.data.interviewee,
          ...questionnaireData.data.questionnaire.contact
        }
      })
    }
  }, [questionnaireData.data])

  useEffect(() => {
    questionnaireData.refetch()
  }, [questionnaireId])

  const onSubmit = async ({ status, recall_date, ...data }: any) => {
    console.log('onSubmit', data)
    await saveForm.mutateAsync({
      id: questionnaireId!,
      questionnaire: JSON.stringify(data),
      status,
      recall_date,
      interviewee_id: interviewee?.id!
    })
    toast({
      title: 'Formulário enviado com sucesso',
      description: 'Veja o console.log para ver os dados enviados'
    })

    to('/')
  }

  if (!questionnaireId || !interviewee) {
    return null
  }

  return (
    <>
      <ContactProvider contact={interviewee!}>
        <InterviewerHeaderPage className="mb-0" />

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
                          <Link to={'/'}>
                            <CaretLeftIcon className="w-6 h-6" />
                            <span>Voltar</span>
                          </Link>
                        </Button>
                      </div>
                      <QuestionnaireForm name={type} />
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
      </ContactProvider>
    </>
  )
}

export default InterviewerQuestionnaireRecall
