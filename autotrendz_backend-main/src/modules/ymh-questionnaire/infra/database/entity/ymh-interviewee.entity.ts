import {
  YmhQuestionnaireEntity,
  YmhRegionEntity,
} from '@/modules/ymh-questionnaire/infra/database/entity'

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm'

@Entity('ymh_interviewees')
export class YmhIntervieweeEntity {
  @PrimaryColumn({ nullable: false, unique: true })
  id: string

  @Column({ nullable: false })
  name: string

  @Column({ nullable: false })
  phone: string

  @Column({ nullable: false, default: false })
  made_revision: boolean

  @Column()
  region_id: string

  @ManyToOne(() => YmhRegionEntity)
  @JoinColumn({ name: 'region_id' })
  region: YmhRegionEntity

  @OneToOne(() => YmhQuestionnaireEntity, (quest) => quest.interviewee)
  questionnaire: YmhQuestionnaireEntity

  @Column({ type: 'timestamp with time zone', nullable: true })
  last_pick_at: Date

  @CreateDateColumn()
  created_at: Date
}
