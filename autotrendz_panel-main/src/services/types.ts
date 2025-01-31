export namespace Api {
  export namespace Input {
    export interface SaveQuestionnaire {
      id?: string
      name?: string
      status: 'IN_PROGRESS' | 'NOT_REACHABLE' | 'SAVED' | 'FINISHED'
      recall_date?: string
      questionnaire: any
      interviewee_id?: string
    }
  }

  export interface City {
    id: string
    name: string
  }

  export interface Questionnaire {
    id: string
    name: string
    key: 'q$001'
  }
}
