import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'
import QuestionnaireForm from '@/pages/interviewer/InterviewerQuestionnaire/src/QuestionnaireForm'
import { useSaveQuestionnaire } from '@/services/hooks/ymh-questionnaire/useSaveQuestionnaire'
import { YmhQuestionnaire } from '@/services/YmhQuestionnaire'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { AvatarIcon } from '@radix-ui/react-icons'
import { useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber'
import React, { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { BiPhone } from 'react-icons/bi'

interface AdminInterviewerFormModalProps {
  contact: YmhQuestionnaire.ContactQuestionnaireAdmin
  isOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
}

const AdminInterviewerFormModal: React.FC<AdminInterviewerFormModalProps> = ({
  contact,
  isOpen = false,
  onOpenChange
}) => {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const form = useForm({
    defaultValues: {
      ...contact.questionnaire?.questionnaire,
      status: contact.questionnaire?.status,
      recall_date: contact.questionnaire?.recall_date
    }
  })

  const saveForm = useSaveQuestionnaire({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['ymh-questionnaire', 'pending-quetionnaires']
      })
    }
  })

  const onSubmit = async () => {
    const { status, recall_date, ...data } = form.getValues() as any
    await saveForm.mutateAsync({
      id: contact.questionnaire?.id!,
      questionnaire: JSON.stringify(data),
      interviewee_id: contact.id,
      status,
      recall_date
    })
    toast({
      title: 'Formulário enviado com sucesso',
      description: 'Veja o console.log para ver os dados enviados'
    })
  }

  useEffect(() => {
    if (isOpen) {
      form.reset({
        ...contact.questionnaire?.questionnaire,
        status: contact.questionnaire?.status,
        recall_date: contact.questionnaire?.recall_date
          ? format(
              new Date(contact.questionnaire?.recall_date),
              "yyyy-MM-dd'T'HH:mm"
            )
          : undefined
      })
    }
  }, [isOpen])

  const phone = useMemo(() => {
    try {
      return PhoneNumberUtil.getInstance().format(
        PhoneNumberUtil.getInstance().parse(contact.phone, 'BR'),
        PhoneNumberFormat.NATIONAL
      )
    } catch (error) {
      return contact.phone
    }
  }, [contact.phone])

  return (
    <>
      <Form {...form}>
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
          <DialogContent className="w-full gap-0 p-0 max-w-full rounded-xl h-screen overflow-y-auto [&_.form-block-header]:-top-1 md:max-w-[90vw]">
            <DialogHeader className="px-6 py-8 border-b">
              <DialogTitle>{contact.name}</DialogTitle>
              <DialogDescription>
                {'Confira os detalhes da entrevista realizada pelo entrevistador.'}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-1 w-full relative">
              <div className="absolute w-full h-full left-0 top-0 overflow-y-auto">
                <div className="flex gap-12 px-6 pt-12">
                  <div className="flex-1">
                    <div className="max-w-[700px] mx-auto flex flex-col gap-6">
                      <QuestionnaireForm
                        name={contact.made_revision ? 'revision' : 'non_revision'}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col w-1/4">
                    <div className="sticky top-4">
                      <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-16 h-16 rounded-xl">
                            <AvatarFallback className="border rounded-xl">
                              <AvatarIcon className="w-10 h-10" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col flex-1">
                            <span className="text-2xl font-bold">
                              {contact.name}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-xl border bg-muted flex items-center justify-center">
                            <BiPhone className="w-6 h-6" />
                          </div>
                          <div className="flex flex-col flex-1">
                            <span className="text-xs">Telefone</span>
                            <span className="text-lg font-bold">{phone}</span>
                          </div>
                        </div>
                        <Separator />
                        <FormField
                          name={'status'}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Status do Questionário</FormLabel>
                              <FormControl>
                                <Select
                                  value={field.value}
                                  onValueChange={field.onChange}
                                >
                                  <SelectTrigger className="w-full">
                                    <SelectValue
                                      placeholder={'Status do Questionário'}
                                    />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {[
                                      {
                                        title: 'Finalizado com Sucesso',
                                        value:
                                          YmhQuestionnaire.QuestionnaireStatus
                                            .FINISHED
                                      },
                                      {
                                        title: 'Salvo',
                                        value:
                                          YmhQuestionnaire.QuestionnaireStatus.SAVED
                                      },
                                      {
                                        title: 'Em Progresso',
                                        value:
                                          YmhQuestionnaire.QuestionnaireStatus
                                            .IN_PROGRESS
                                      },
                                      {
                                        title: 'Ausente',
                                        value:
                                          YmhQuestionnaire.QuestionnaireStatus
                                            .NOT_REACHABLE
                                      }
                                    ].map((item) => (
                                      <SelectItem
                                        key={item.value}
                                        value={item.value as string}
                                      >
                                        {item.title}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          name={'recall_date'}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Data de Retorno</FormLabel>
                              <FormControl>
                                <Input
                                  disabled={!field.value}
                                  type={'datetime-local'}
                                  placeholder={'Data de Retorno'}
                                  value={field.value}
                                  readOnly
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <Button
                          type={'submit'}
                          onClick={() => {
                            onSubmit()
                          }}
                          disabled={
                            saveForm.isPending || form.formState.isSubmitting
                          }
                        >
                          Salvar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </Form>
    </>
  )
}

export default AdminInterviewerFormModal
