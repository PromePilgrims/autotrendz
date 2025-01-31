import { Execution, ExecutionId } from '@/modules/audatex/domain/entity'
import { IAudatexExecutionRepository } from '@/modules/audatex/domain'

import XLSX from 'xlsx'
import { Inject, Injectable } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bullmq'
import { Queue } from 'bullmq'

@Injectable()
export class StartScrapExecution {
  constructor(
    @Inject('AudatexExecutionRepository')
    private readonly executionRepository: IAudatexExecutionRepository,
    @InjectQueue('audatex') private readonly audatexQueue: Queue,
  ) {}

  async exec({
    triggered_by,
    originalname,
    buffer,
  }: StartScrapExecution.Input): Promise<StartScrapExecution.Output> {
    const workbook = XLSX.read(buffer, { type: 'buffer' })
    const jsonData = XLSX.utils.sheet_to_json(
      workbook.Sheets[workbook.SheetNames[0]],
    )

    const keys = Object.keys(jsonData[0]).map((key) => key.trim().toLowerCase())
    if (!keys.includes('pn') || !keys.includes('marca')) {
      throw new Error('The fields "PN" and "Marca" are required')
    }

    const normalizedData = []
    for (const row of jsonData) {
      const normalizedRow = {}
      for (const [key, value] of Object.entries(row)) {
        normalizedRow[key.trim().toLowerCase()] = value
      }
      normalizedData.push(normalizedRow)
    }

    const execution = Execution.create({
      id: ExecutionId.create(),
      source_file_name: originalname,
      source_temp_file_data: normalizedData,
      triggered_by,
    })

    await this.executionRepository.save(execution)

    await this.audatexQueue.add('executeScrap', {
      execution_id: execution.id.id.toString(),
    })

    return {
      originalname,
      date: execution.triggered_at,
    }
  }
}

export namespace StartScrapExecution {
  export type Input = {
    triggered_by: string
    originalname: string
    buffer: Buffer
  }

  export type Output = {
    originalname: string
    date: Date
  }
}
