import { QuestionnaireStatuses } from '@/modules/ymh-questionnaire/domain/entity'

export const statusMap = {
  [QuestionnaireStatuses.IN_PROGRESS]: 'EM ANDAMENTO',
  [QuestionnaireStatuses.NOT_REACHABLE]: 'SEM CONTATO',
  [QuestionnaireStatuses.SAVED]: 'SALVO',
  [QuestionnaireStatuses.FINISHED]: 'FINALIZADO',
}
