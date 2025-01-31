import YmhQuestionnaireAPI from '@/services/YmhQuestionnaire'
import { useQuery } from '@tanstack/react-query'

export function useAdminListQuestionnaireContactData(
  questionnaireId: string,
  contactId: string
) {
  const query = useQuery({
    queryKey: ['ymh-questionnaire', 'forms', questionnaireId, 'contacts', contactId],
    queryFn: async () => {
      return YmhQuestionnaireAPI.loadQuestionnaireData({
        contactId,
        questionnaireId
      })
    }
  })

  return query
}
