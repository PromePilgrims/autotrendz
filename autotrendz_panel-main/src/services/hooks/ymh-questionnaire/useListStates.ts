import YmhQuestionnaire from '@/services/YmhQuestionnaire'
import { useQuery } from '@tanstack/react-query'

export function useListStates() {
  const query = useQuery({
    queryKey: ['ymh-questionnaire', 'states'],
    queryFn: async () => {
      return YmhQuestionnaire.getStates().then((res) => res.data)
    }
  })

  return query
}
