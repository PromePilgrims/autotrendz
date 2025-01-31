import {
  ExportQuestionnaires,
  ListInterviewee,
  ListQuestionnaire,
  ListQuestionnaires,
  ListQuestionnairesWithInterviewees,
  ListRegions,
  ListSummary,
  SaveQuestionnaire,
} from '@/modules/ymh-questionnaire/domain/use-cases'
import { YmhQuestionnaireController } from '@/modules/ymh-questionnaire/application/controllers'
import { YmhQuestionnaireRepository } from '@/modules/ymh-questionnaire/infra/database'
import {
  YmhIntervieweeEntity,
  YmhQuestionnaireEntity,
  YmhRegionEntity,
} from '@/modules/ymh-questionnaire/infra/database/entity'
import { ClientModule } from '@/modules/client/infra'
import { S3FileService } from '@/modules/@shared/infra/services'

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      YmhQuestionnaireEntity,
      YmhIntervieweeEntity,
      YmhRegionEntity,
    ]),
    ClientModule,
  ],
  controllers: [YmhQuestionnaireController],
  providers: [
    {
      provide: 'YmhQuestionnaireRepository',
      useClass: YmhQuestionnaireRepository,
    },
    {
      provide: 'FileService',
      useClass: S3FileService,
    },
    SaveQuestionnaire,
    ListQuestionnaires,
    ListQuestionnaire,
    ListInterviewee,
    ListRegions,
    ListQuestionnairesWithInterviewees,
    ListSummary,
    ExportQuestionnaires,
  ],
})
export class YmhQuestionnaireModule {}
