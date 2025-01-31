import YmhQuestionnaireAPI, { YmhQuestionnaire } from '@/services/YmhQuestionnaire'
import { useQuery } from '@tanstack/react-query'

export function useAdminListQuestionnaireContacts(
  questionnaireId: string,
  status?: YmhQuestionnaire.AdminLoadQuestrionnarieContactsInput['status']
) {
  const query = useQuery({
    queryKey: ['ymh-questionnaire', 'forms', questionnaireId, 'contacts'],
    queryFn: async () => {
      return YmhQuestionnaireAPI.loadQuestionnaireContacts({
        questionnaireId,
        status
      })
    }
  })

  return query
}
