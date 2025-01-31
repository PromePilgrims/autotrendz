import { Client } from '@/modules/client/domain'
import {
  QuestionnaireId,
  QuestionnaireStatuses,
  Interviewee,
} from '@/modules/ymh-questionnaire/domain/entity'

type QuestionnaireProps = {
  id: QuestionnaireId
  title?: string
  interviewer_id: string
  interviewer: Client
  interviewee: Interviewee
  status?: QuestionnaireStatuses
  questionnaire: string
  recall_date?: Date
  created_at?: Date
  updated_at?: Date
}

export class Questionnaire {
  private constructor(
    private readonly _id: QuestionnaireId,
    private readonly _title: string = null,
    private readonly _interviewer_id: string,
    public readonly _interviewer: Client,
    private readonly _interviewee: Interviewee,
    private _status: QuestionnaireStatuses,
    private _questionnaire: string,
    private _recall_date?: Date,
    private readonly _created_at?: Date,
    private _updated_at?: Date,
  ) {}

  get id(): QuestionnaireId {
    return this._id
  }

  get title(): string {
    return this._title
  }

  get interviewer_id(): string {
    return this._interviewer_id
  }

  get interviewee(): Interviewee {
    return this._interviewee
  }

  get interviewer(): Client {
    return this._interviewer
  }

  get interviewee_id(): string {
    return this._interviewee.id.toString()
  }

  get status(): QuestionnaireStatuses {
    return this._status
  }

  get questionnaire(): string {
    return this._questionnaire
  }

  get recall_date(): Date | null {
    return this._recall_date
  }

  get created_at(): Date | null {
    return this._created_at
  }

  get updated_at(): Date | null {
    return this._updated_at
  }

  setStatus(status: QuestionnaireStatuses): void {
    if (status === this._status) {
      return
    }

    if (
      this._status === QuestionnaireStatuses.FINISHED &&
      status !== QuestionnaireStatuses.SAVED
    ) {
      throw new Error(
        'You can only change status of a FINISHED questionnaire to SAVED',
      )
    }

    this._status = status
  }

  setQuestionnaire(questionnaire: string): void {
    this._questionnaire = questionnaire
  }

  setRecallDate(recall_date: Date): void {
    this._recall_date = recall_date
  }

  public static create({
    id,
    title,
    interviewer_id,
    interviewer,
    interviewee,
    status,
    questionnaire,
    recall_date,
    created_at,
    updated_at,
  }: QuestionnaireProps): Questionnaire {
    const now = new Date()

    const newQuestionnaire = new Questionnaire(
      id,
      title,
      interviewer_id,
      interviewer,
      interviewee,
      status,
      questionnaire,
      recall_date,
      created_at ?? now,
      updated_at ?? now,
    )

    return new Proxy(newQuestionnaire, {
      set: (target, prop, value) => {
        target[prop] = value
        target._updated_at = new Date()
        return true
      },
    })
  }
}
