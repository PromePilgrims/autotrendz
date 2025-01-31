import { useQuery } from '@tanstack/react-query'
import { Api } from '../../types'

export function useListQuestionnaires() {
  return useQuery({
    queryKey: ['questionnaires'],
    queryFn: async () => {
      return [
        {
          id: 'questionnaire-001',
          name: 'Questionnaire 001'
        },
        {
          id: 'questionnaire-002',
          name: 'Questionnaire 002'
        },
        {
          id: 'questionnaire-003',
          name: 'Questionnaire 003'
        }
      ] as Api.Questionnaire[]
    }
  })
}
