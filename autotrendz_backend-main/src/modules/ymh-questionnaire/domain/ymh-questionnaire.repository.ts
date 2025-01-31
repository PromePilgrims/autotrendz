import { Questionnaire } from '@/modules/ymh-questionnaire/domain'
import {
  Interviewee,
  QuestionnaireStatuses,
  Region,
} from '@/modules/ymh-questionnaire/domain/entity'

export type FindOptions = {
  id?: string
  interviewee_id?: string
  interviewer_id?: string
  interviewee?: { region_id: string }
  status?: QuestionnaireStatuses
}

export type FindIntervieweeProps = {
  id: string
}

export type FindRandomIntervieweeProps = {
  made_revision?: boolean
  region_id: string
}

export type FindIntervieweesWithQuestionnairesProps = {
  region?: string
  status?: QuestionnaireStatuses
  has_questionnaire?: boolean
  made_revision?: boolean
}

export type Summary = Record<
  string,
  {
    total_interviews: number
    total_interviewees: number
    completed: number
    in_progress: number
    not_reachable: number
    pending: number
    made_revision: number
    did_not_make_revision: number
  }
>

type IntervieweesWithQuestionnaires = Interviewee & {
  questionnaire: Questionnaire
  region: Region
}

export interface IYmhQuestionnaireRepository {
  save(questionnaire: Questionnaire): Promise<void>

  find(props?: FindOptions): Promise<Questionnaire[]>

  findInterviewee(props: FindIntervieweeProps): Promise<Interviewee[]>

  findIntervieweesWithQuestionnaires(
    props: FindIntervieweesWithQuestionnairesProps,
  ): Promise<IntervieweesWithQuestionnaires[]>

  findRandomAvailableInterviewee(
    props: FindRandomIntervieweeProps,
  ): Promise<Interviewee>

  findRegions(): Promise<Region[]>

  getSummary(): Promise<Summary>
}
