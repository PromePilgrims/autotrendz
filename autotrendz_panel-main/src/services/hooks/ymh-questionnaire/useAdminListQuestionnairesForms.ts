import YmhQuestionnaire from '@/services/YmhQuestionnaire'
import { useQuery } from '@tanstack/react-query'

export function useAdminListQuestionnairesForms() {
  const query = useQuery({
    queryKey: ['ymh-questionnaire', 'forms'],
    queryFn: async () => {
      return YmhQuestionnaire.getAdminQuestionnaires()
    }
  })

  return query
}
