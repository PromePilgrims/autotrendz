import {
  FindIntervieweeProps,
  FindIntervieweesWithQuestionnairesProps,
  FindOptions,
  FindRandomIntervieweeProps,
  IYmhQuestionnaireRepository,
  Questionnaire,
  Summary,
} from '@/modules/ymh-questionnaire/domain'
import {
  YmhIntervieweeEntity,
  YmhQuestionnaireEntity,
  YmhRegionEntity,
} from '@/modules/ymh-questionnaire/infra/database/entity'
import { Interviewee, Region } from '@/modules/ymh-questionnaire/domain/entity'
import {
  YmhIntervieweeMapper,
  YmhQuestionnaireMapper,
  YmhRegionMapper,
} from '@/modules/ymh-questionnaire/infra'

import { InjectRepository } from '@nestjs/typeorm'
import { Brackets, Repository } from 'typeorm'
import { DateTime } from 'luxon'

export class YmhQuestionnaireRepository implements IYmhQuestionnaireRepository {
  constructor(
    @InjectRepository(YmhQuestionnaireEntity)
    private readonly repository: Repository<YmhQuestionnaireEntity>,
    @InjectRepository(YmhIntervieweeEntity)
    private readonly intervieweeRepo: Repository<YmhIntervieweeEntity>,
    @InjectRepository(YmhRegionEntity)
    private readonly regionRepo: Repository<YmhRegionEntity>,
  ) {}

  async save(questionnaire: Questionnaire): Promise<void> {
    await this.repository.save(
      YmhQuestionnaireMapper.toPersistence(questionnaire),
    )
  }

  async find(where?: FindOptions): Promise<Questionnaire[]> {
    const datas = await this.repository.find({
      where: where ?? {},
      relations: ['interviewee.region', 'interviewer'],
    })
    return datas.map((data) => YmhQuestionnaireMapper.toDomain(data))
  }

  async findInterviewee(where: FindIntervieweeProps): Promise<Interviewee[]> {
    const interviewees = await this.intervieweeRepo.find({
      where,
      relations: ['region'],
    })
    return interviewees.map((interviewee) =>
      YmhIntervieweeMapper.toDomain(interviewee),
    )
  }

  async findRandomAvailableInterviewee(
    params: FindRandomIntervieweeProps,
  ): Promise<Interviewee> {
    const intervieweeQuery = this.intervieweeRepo
      .createQueryBuilder('ymh_interviewees')
      .select()
      .leftJoin(
        'ymh_questionnaires',
        'questionnaire',
        'questionnaire.interviewee_id = ymh_interviewees.id',
      )
      .leftJoinAndSelect('ymh_interviewees.region', 'region')
      .where('ymh_interviewees.region_id = :region', {
        region: params.region_id,
      })
      .andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select('COUNT(*)')
          .from('ymh_questionnaires', 'sub_questionnaire')
          .where('sub_questionnaire.interviewee_id = ymh_interviewees.id')
          .andWhere('sub_questionnaire.status = :status', {
            status: 'NOT_REACHABLE',
          })
          .getQuery()

        return `CASE WHEN (${subQuery}) > 0 THEN questionnaire.status = :status ELSE questionnaire.status IS NULL END`
      })
      .andWhere(
        new Brackets((qb) => {
          qb.where('last_pick_at IS NULL').orWhere(
            "last_pick_at <= (CURRENT_TIMESTAMP - INTERVAL '20 minutes')",
          )
        }),
      )
      .andWhere('ymh_interviewees.made_revision = :made_revision', {
        made_revision: params.made_revision,
      })
      .setParameter('status', 'NOT_REACHABLE')
      .orderBy('RANDOM()')

    const interviewee = await intervieweeQuery.getOne()

    if (!interviewee) {
      return null
    }

    await this.intervieweeRepo.update(interviewee.id, {
      last_pick_at: DateTime.now().toUTC().toJSDate(),
    })

    return YmhIntervieweeMapper.toDomain(interviewee)
  }

  async findRegions(): Promise<Region[]> {
    const regions = await this.regionRepo.find({
      order: {
        name: 'ASC',
      },
    })
    return regions.map((region) => YmhRegionMapper.toDomain(region))
  }

  async findIntervieweesWithQuestionnaires(
    props: FindIntervieweesWithQuestionnairesProps,
  ): Promise<any> {
    const intervieweesQuery = this.intervieweeRepo
      .createQueryBuilder('ymh_interviewees')
      .withDeleted()
      .select()
      .leftJoinAndSelect('ymh_interviewees.region', 'region')
      .orderBy('questionnaire.created_at', 'ASC')
      .addOrderBy('ymh_interviewees.name', 'ASC')

    if (props.made_revision !== undefined) {
      intervieweesQuery.where(
        'ymh_interviewees.made_revision = :made_revision',
        {
          made_revision: props.made_revision,
        },
      )
    }

    if (props.has_questionnaire) {
      intervieweesQuery.innerJoinAndSelect(
        'ymh_interviewees.questionnaire',
        'questionnaire',
      )
      intervieweesQuery.leftJoinAndSelect(
        'questionnaire.interviewer',
        'interviewer',
      )
    } else {
      intervieweesQuery.leftJoinAndSelect(
        'ymh_interviewees.questionnaire',
        'questionnaire',
      )
    }

    if (props.region) {
      intervieweesQuery.where('ymh_interviewees.region_id = :region', {
        region: props.region,
      })
    }

    if (props.status) {
      intervieweesQuery.andWhere('questionnaire.status = :status', {
        status: props.status,
      })
    }

    const interviewees = await intervieweesQuery.getMany()

    return interviewees
  }

  async getSummary(): Promise<Summary> {
    const summary = {}

    const regions = await this.regionRepo.find()
    for (const region of regions) {
      const interviewees = await this.intervieweeRepo.find({
        where: {
          region_id: region.id,
        },
        relations: ['questionnaire'],
      })

      summary[region.name] = {
        total_interviewees: interviewees.length,
        total_interviews: interviewees.filter(
          (interviewee) => interviewee.questionnaire,
        ).length,
        completed: interviewees.filter(
          (interviewee) =>
            interviewee.questionnaire &&
            interviewee.questionnaire.status === 'FINISHED',
        ).length,
        in_progress: interviewees.filter(
          (interviewee) =>
            interviewee.questionnaire &&
            interviewee.questionnaire.status === 'IN_PROGRESS',
        ).length,
        pending: interviewees.filter(
          (interviewee) =>
            interviewee.questionnaire &&
            interviewee.questionnaire.status === 'SAVED',
        ).length,
        not_reachable: interviewees.filter(
          (interviewee) =>
            interviewee.questionnaire &&
            interviewee.questionnaire.status === 'NOT_REACHABLE',
        ).length,
        made_revision: interviewees.filter(
          (interviewee) => interviewee.made_revision,
        ).length,
        did_not_make_revision: interviewees.filter(
          (interviewee) => !interviewee.made_revision,
        ).length,
      }
    }

    return summary
  }
}
