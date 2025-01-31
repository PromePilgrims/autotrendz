import { IFileUploadService } from '@/modules/@shared/domain/contracts'
import {
  IAudatexExecutionRepository,
  IScrapperService,
} from '@/modules/audatex/domain'

import { Inject, Injectable } from '@nestjs/common'
import { DateTime } from 'luxon'
import xlsx from 'xlsx'

@Injectable()
export class ExecuteScrap {
  constructor(
    @Inject('AudatexExecutionRepository')
    private readonly executionRepository: IAudatexExecutionRepository,
    @Inject('FileService')
    private readonly fileService: IFileUploadService,
    @Inject('ScrapperService')
    private readonly scrapperService: IScrapperService,
  ) {}

  async exec({
    execution_id,
  }: ExecuteScrap.Input): Promise<ExecuteScrap.Output> {
    const execution = await this.executionRepository.findOneBy({
      id: execution_id,
    })

    if (!execution) throw new Error('Execution not found')

    const result = await this.scrapperService.exec(
      execution.source_temp_file_data,
    )

    const dateNow = new Date()
    const date = DateTime.fromJSDate(dateNow).toFormat('dd-MM-yyyy HH:mm')

    const newWorkbook = xlsx.utils.book_new()
    xlsx.utils.book_append_sheet(
      newWorkbook,
      xlsx.utils.json_to_sheet(result),
      'Preços',
    )

    const url = await this.fileService.upload({
      fileName: `audatex/Preços Audatex - ${date}.xlsx`,
      buffer: xlsx.write(newWorkbook, { bookType: 'xlsx', type: 'buffer' }),
    })

    execution.setOutputFileUrl(url)
    execution.complete()

    await this.executionRepository.save(execution)
  }
}

export namespace ExecuteScrap {
  export type Input = {
    execution_id: string
  }

  export type Output = void
}
