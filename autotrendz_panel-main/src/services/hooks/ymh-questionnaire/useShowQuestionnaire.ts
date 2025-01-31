import { useQuery } from '@tanstack/react-query'
import YmhQuestionnaire from '@/services/YmhQuestionnaire'

export function useShowQuestionnaireForm(stateId: string, questionnaireId: string) {
  return useQuery({
    queryKey: [
      'ymh-questionnaire',
      'states',
      stateId,
      'questionnaires',
      questionnaireId
    ],
    queryFn: async () => {
      return YmhQuestionnaire.findQuestionnaireForm(stateId, questionnaireId)
    }
  })
}
