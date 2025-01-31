import NonRevisionSurveyForm from '@/components/questionnaires/NonRevisionSurveyForm'
import RevisionSurveyForm from '@/components/questionnaires/RevisionSurveyForm'
import { YmhQuestionnaire } from '@/services/YmhQuestionnaire'
import React from 'react'

interface QuestionnaireFormProps {
  name: YmhQuestionnaire.QuestionnaireForm['name']
}

const QuestionnaireForm: React.FC<QuestionnaireFormProps> = ({ name }) => {
  if (name === 'non_revision') {
    return <NonRevisionSurveyForm />
  }

  if (name === 'revision') {
    return <RevisionSurveyForm />
  }
}

export default QuestionnaireForm
