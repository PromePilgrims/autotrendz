import { IFileUploadService } from '@/modules/@shared/domain/contracts'
import { IYmhQuestionnaireRepository } from '@/modules/ymh-questionnaire/domain'
import { revisionFields } from '@/modules/ymh-questionnaire/domain/use-cases/export-questionnaires/fields-revision'
import { nonRevisionFields } from '@/modules/ymh-questionnaire/domain/use-cases/export-questionnaires/fields-non-revision'
import { statusMap } from '@/modules/ymh-questionnaire/domain/use-cases/export-questionnaires/status-map'

import { Inject } from '@nestjs/common'
import get from 'lodash/get'
import xlsx from 'xlsx'
import { DateTime } from 'luxon'

export class ExportQuestionnaires {
  constructor(
    @Inject('YmhQuestionnaireRepository')
    private readonly questRepo: IYmhQuestionnaireRepository,
    @Inject('FileService')
    private readonly fileService: IFileUploadService,
  ) {}

  async execute({
    made_revision,
  }: ExportQuestionnaires.Input): Promise<ExportQuestionnaires.Output> {
    const questionnaires =
      await this.questRepo.findIntervieweesWithQuestionnaires({
        made_revision,
        has_questionnaire: true,
      })

    const allQuestionnaires = []
    const fields = made_revision ? revisionFields : nonRevisionFields
    const emptyField = null

    for (const interviewee of questionnaires) {
      const matchedRevisionFields = {}
      const questionnaire = interviewee.questionnaire.questionnaire
      const created_at = interviewee.questionnaire.created_at

      matchedRevisionFields['Praça'] = interviewee.region.name
      matchedRevisionFields['Status'] =
        statusMap[interviewee.questionnaire.status]
      matchedRevisionFields['Respondido em'] =
        DateTime.fromJSDate(created_at).toFormat('dd/MM/yyyy HH:mm')
      matchedRevisionFields['Entrevistador'] =
        interviewee.questionnaire.interviewer.name
      matchedRevisionFields['Telefone'] = interviewee.phone

      for (const field of fields) {
        const quest =
          typeof questionnaire == 'string'
            ? JSON.parse(questionnaire)
            : questionnaire
        const value = get(quest, field.name)

        if (['textarea', 'text', 'number'].includes(field.type)) {
          matchedRevisionFields[field.title] = value ?? emptyField
          continue
        }

        if (field.type == 'percentage') {
          matchedRevisionFields[field.title] = value ? `${value}%` : emptyField
          continue
        }

        if (field.type == 'revisions_prices') {
          if (!value) {
            matchedRevisionFields[field.rev + ' A'] = emptyField
            matchedRevisionFields[field.rev + ' B'] = emptyField
            continue
          }
          Object.values(value).forEach(
            (v, i) =>
              (matchedRevisionFields[
                `${field.rev} ${String.fromCharCode(i + 'A'.charCodeAt(0))}`
              ] = v ? Number(v) : emptyField),
          )
          continue
        }

        if (field.type == 'select') {
          if (field.rev) {
            field.options.map((o) => {
              matchedRevisionFields[`${field.rev} ${o.value}`] =
                o.value == value ? o.label : emptyField
            })
            continue
          }

          const option = field.options.find((o) => o.value == value?.selected)
          matchedRevisionFields[field.title] =
            (option?.label != 'Outro' ? option?.label : value.other) ??
            emptyField
          continue
        }

        if (field.type == 'radio') {
          const option = field.options.find((o) => o.value == value?.selected)
          matchedRevisionFields[field.title] = option?.label ?? emptyField
          continue
        }

        if (field.type == 'checkbox') {
          if (field.rev) {
            field.options.map((o) => {
              matchedRevisionFields[`${field.rev} ${o.value}`] =
                value?.values.includes(o.value)
                  ? o.label != 'Outro'
                    ? o.label
                    : value.other
                  : emptyField
            })
            continue
          }

          field.options.map((option) => {
            matchedRevisionFields[`${field.title} - ${option.label}`] =
              value?.values.includes(option.value)
                ? option.description ?? option.label
                : emptyField
          })
          continue
        }

        if (field.type == 'checkbox_percentage') {
          field.options.map((option) => {
            matchedRevisionFields[`${field.title} - ${option.label}`] =
              emptyField

            if (!value) return

            for (const v of value) {
              if (v.value == option.value) {
                matchedRevisionFields[`${field.title} - ${option.label}`] =
                  `${option.label} (${v.percentage}%)`
              }
            }
          })
          continue
        }
      }

      allQuestionnaires.push(matchedRevisionFields)
    }

    const wb = xlsx.utils.book_new()
    xlsx.utils.book_append_sheet(
      wb,
      xlsx.utils.json_to_sheet(allQuestionnaires),
      'Questionários',
    )

    const buffer = xlsx.write(wb, { bookType: 'xlsx', type: 'buffer' })
    const fileName = `ymh-questionnaires/Questionarios_${
      made_revision ? 'Revisão' : 'Não_Revisão'
    }_${DateTime.now().toFormat(
      'dd-MM-yyyy',
    )}_${DateTime.now().toMillis()}.xlsx`

    const url = await this.fileService.upload({
      buffer,
      fileName,
      expires: DateTime.now().plus({ hour: 1 }).toJSDate(),
    })

    return { url }
  }
}

export namespace ExportQuestionnaires {
  export type Input = {
    made_revision: boolean
  }

  export type Output = {
    url: string
  }
}
