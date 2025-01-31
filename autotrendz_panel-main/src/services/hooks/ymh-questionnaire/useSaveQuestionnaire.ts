import YmhQuestionnaireAPI, {
  type YmhQuestionnaire
} from '@/services/YmhQuestionnaire'
import {
  UseMutationOptions,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'

export function useSaveQuestionnaire(
  options?: Partial<
    UseMutationOptions<undefined, undefined, YmhQuestionnaire.SaveInput>
  >
) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationKey: ['questionnaires'],
    mutationFn: async (questionnaire) => {
      await YmhQuestionnaireAPI.save(questionnaire)
      await queryClient.invalidateQueries({
        queryKey: ['questionnaires', questionnaire.id]
      })

      return undefined
    },
    ...options
  })

  return mutation
}
