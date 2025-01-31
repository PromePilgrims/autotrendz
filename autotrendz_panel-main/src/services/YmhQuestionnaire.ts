import { api } from './api'

export class YmhQuestionnaire {
  async save(data: YmhQuestionnaire.SaveInput) {
    return api
      .post<YmhQuestionnaire.SaveOutput>('/ymh-questionnaires', data)
      .then((res) => res.data)
  }

  async getAvailableInterviewee(
    state: YmhQuestionnaire.State['id'],
    type: YmhQuestionnaire.QuestionnaireForm['name']
  ): Promise<YmhQuestionnaire.GetAvailableIntervieweeOutput> {
    await new Promise((resolve) => setTimeout(resolve, 3000)) // Simulate loading
    return api
      .get('/ymh-questionnaires/available-interviewee', {
        params: {
          made_revision: type === 'non_revision' ? 'false' : 'true',
          region_id: state
        }
      })
      .then((res) => res.data)
      .catch(() => {
        return {
          id: '1',
          name: 'Fulano',
          phone: '5511991174114',
          address: {
            street: 'Rua dos Bobos',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '12345-678'
          }
        } as YmhQuestionnaire.GetAvailableIntervieweeOutput
      })
  }

  async getQuestionnairesForms(
    _stateId: string
  ): Promise<YmhQuestionnaire.GetQuestionnairesFormsOutput> {
    return {
      data: [
        {
          name: 'revision',
          title: 'Fez Revisão',
          description: 'Entrevista aos clientes que fizeram a revisão.'
        },
        {
          name: 'non_revision',
          title: 'Não Fez Revisão',
          description: 'Entrevista aos clientes que não fizeram a revisão.'
        }
      ]
    }
  }

  async findQuestionnaireForm(stateId: string, questionnaireId: string) {
    const forms = await this.getQuestionnairesForms(stateId)
    return forms.data.find((form) => form.name === questionnaireId)!
  }

  async getStates(): Promise<YmhQuestionnaire.GetStatesOutput> {
    return api.get('/ymh-questionnaires/regions')
  }

  async getAdminQuestionnaires(): Promise<YmhQuestionnaire.AdminLoadQuestionnairesOutput> {
    return this.getStates().then((states) => {
      return states.data.map((state) => ({
        id: state.id,
        title: state.name,
        revisions: {
          completed: 10,
          pending: 20
        },
        questionnaires: {
          completed: 0,
          pending: 30
        }
      }))
    })
  }

  async findAdminQuestionnaire(
    questionnaireId: string
  ): Promise<YmhQuestionnaire.AdminFindQuestionnarieOutput> {
    const questionnaires = await this.getAdminQuestionnaires()
    return questionnaires.find(
      (questionnaire) => questionnaire.id === questionnaireId
    )!
  }

  async findState(id: string) {
    const states = await this.getStates()
    return states.data.find((state) => state.id === id)
  }

  async loadQuestionnaires() {
    return api
      .get<YmhQuestionnaire.Questionnaire[]>('/ymh-questionnaires')
      .then((res) => res.data)
  }

  async show(questionnaireId: string) {
    return api
      .get<YmhQuestionnaire.Questionnaire>(`/ymh-questionnaires/${questionnaireId}`)
      .then((res) => res.data)
  }

  async loadQuestionnaireContacts({
    questionnaireId,
    status
  }: YmhQuestionnaire.AdminLoadQuestrionnarieContactsInput): Promise<YmhQuestionnaire.AdminLoadQuestionnaireContactsOutput> {
    return api
      .get('/ymh-questionnaires/list-with-interviewees', {
        params: {
          region: questionnaireId,
          status
        }
      })
      .then((res) => res.data)
  }

  async loadQuestionnaireData({
    questionnaireId,
    contactId
  }: YmhQuestionnaire.AdminLoadQuestionnaireDataInput): Promise<YmhQuestionnaire.AdminLoadQuestionnaireDataOutput> {
    const data = {}

    const questionnaire = await this.loadQuestionnaireContacts({
      questionnaireId
    }).then((res) => {
      return res.find((c) => c.id === contactId)!
    })

    return {
      id: questionnaire.id,
      data
    }
  }

  async loadRegionsSummary(): Promise<YmhQuestionnaire.AdminRegionsSummaryDataOutput> {
    return api.get('/ymh-questionnaires/summary').then((res) => res.data.data)
  }

  async exportQuestionnaires({
    made_revision
  }: YmhQuestionnaire.ExportQuestionnairesInput): Promise<YmhQuestionnaire.ExportQuestionnairesOutput> {
    return api
      .get('/ymh-questionnaires/export-questionnaires', {
        params: { made_revision }
      })
      .then((res) => ({ url: res.data.url }))
  }
}

export default new YmhQuestionnaire()

export namespace YmhQuestionnaire {
  export interface ListInput {
    state?: string
    interviewee_id?: string
    interviewer_id?: string
  }

  export interface ListOutput {}

  export interface SaveInput {
    id?: string
    status: 'IN_PROGRESS' | 'NOT_REACHABLE' | 'SAVED' | 'FINISHED'
    questionnaire: string
    interviewee_id: string
    recall_date?: string
  }

  export interface SaveOutput {}

  export interface State {
    id: string
    name: string
    description?: string
  }

  export interface QuestionnaireForm {
    name: 'revision' | 'non_revision'
    title: string
    description: string
  }

  export interface GetStatesOutput {
    data: YmhQuestionnaire.State[]
  }

  export interface GetQuestionnairesFormsOutput {
    data: YmhQuestionnaire.QuestionnaireForm[]
  }

  export interface Contact {
    id: string
    name: string
    email?: string
    phone: string
    made_revision?: boolean
    address?: {
      street?: string
      city?: string
      state?: string
      zipCode?: string
    }
  }

  export interface GetAvailableIntervieweeOutput extends Contact {}

  export interface QuestionnaireFormAdmin {
    id: string
    title: string
    revisions: {
      completed: number
      pending: number
    }
    questionnaires: {
      completed: number
      pending: number
    }
  }

  export interface ContactQuestionnaireAdmin {
    id: string
    name: string
    phone: string
    email?: string
    made_revision: boolean
    interview_date?: string
    address?: {
      street?: string
      city?: string
      state?: string
      zipCode?: string
    }
    questionnaire?: YmhQuestionnaire.Questionnaire
    interviewer?: {
      id: string
      name?: string
      email: string
    }
  }

  export interface Questionnaire {
    id: string
    title?: string | null
    status: 'IN_PROGRESS' | 'NOT_REACHABLE' | 'SAVED' | 'FINISHED'
    interviewee: Contact
    interviewer_id: string
    questionnaire: {
      contact: Contact
    }
    recall_date?: string
    created_at: string
    updated_at: string
  }

  export enum QuestionnaireStatus {
    IN_PROGRESS = 'IN_PROGRESS',
    NOT_REACHABLE = 'NOT_REACHABLE',
    SAVED = 'SAVED',
    FINISHED = 'FINISHED'
  }

  export interface QuestionnaireDataAdmin {
    id: string
    // Dados do formulário em "data"
    data?: any
  }

  export type AdminLoadQuestionnairesOutput = QuestionnaireFormAdmin[]

  export type AdminFindQuestionnarieOutput = QuestionnaireFormAdmin

  export type AdminLoadQuestrionnarieContactsInput = {
    questionnaireId: string
    status?: 'IN_PROGRESS' | 'NOT_REACHABLE' | 'SAVED' | 'FINISHED'
  }

  export type AdminLoadQuestionnaireContactsOutput = ContactQuestionnaireAdmin[]

  export type AdminLoadQuestionnaireDataInput = {
    questionnaireId: string
    contactId: string
  }

  export type AdminLoadQuestionnaireDataOutput = QuestionnaireDataAdmin

  export type AdminRegionsSummaryDataOutput = Record<
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

  export type ExportQuestionnairesInput = { made_revision: boolean }

  export type ExportQuestionnairesOutput = { url: string }
}
