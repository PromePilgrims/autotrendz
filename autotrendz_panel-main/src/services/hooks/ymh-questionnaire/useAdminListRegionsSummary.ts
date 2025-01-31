import YmhQuestionnaire from '@/services/YmhQuestionnaire'
import { useQuery } from '@tanstack/react-query'

export function useAdminListRegionsSummary() {
  const query = useQuery({
    queryKey: ['ymh-questionnaire', 'region-summary'],
    queryFn: async () => {
      return YmhQuestionnaire.loadRegionsSummary()
    }
  })

  return query
}
