import YmhQuestionnaire from '@/services/YmhQuestionnaire'
import { useQuery } from '@tanstack/react-query'

export function useListQuestionnairesForms(stateId: string) {
  const query = useQuery({
    queryKey: ['ymh-questionnaire', stateId, 'forms'],
    queryFn: async () => {
      return YmhQuestionnaire.getQuestionnairesForms(stateId).then((res) => res.data)
    }
  })

  return query
}
