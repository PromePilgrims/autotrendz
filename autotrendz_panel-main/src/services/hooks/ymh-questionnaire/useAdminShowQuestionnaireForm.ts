import YmhQuestionnaire from '@/services/YmhQuestionnaire'
import { useQuery } from '@tanstack/react-query'

export function useAdminShowQuestionnaireForm(questionnaireId: string) {
  const query = useQuery({
    queryKey: ['ymh-questionnaire', 'forms', questionnaireId],
    queryFn: async () => {
      return YmhQuestionnaire.findAdminQuestionnaire(questionnaireId)
    }
  })

  return query
}
