import YmhQuestionnaire from '@/services/YmhQuestionnaire'
import { useQuery } from '@tanstack/react-query'

export function useShowState(stateId: string) {
  const query = useQuery({
    queryKey: ['ymh-questionnaire', 'states', stateId],
    queryFn: async () => {
      return YmhQuestionnaire.findState(stateId)
    }
  })

  return query
}
