import YmhQuestionnaireAPI, {
  type YmhQuestionnaire
} from '@/services/YmhQuestionnaire'
import { useQuery } from '@tanstack/react-query'

export function useAvailableInterviewee(
  state: YmhQuestionnaire.State['id'],
  type: YmhQuestionnaire.QuestionnaireForm['name']
) {
  const query = useQuery({
    queryKey: ['ymh-questionnaire', 'available-interviewee', type],
    queryFn: async () => {
      return await YmhQuestionnaireAPI.getAvailableInterviewee(state, type)
    },
    staleTime: Infinity
  })

  return query
}
