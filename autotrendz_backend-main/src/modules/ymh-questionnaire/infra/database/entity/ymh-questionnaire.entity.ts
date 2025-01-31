import { ClientEntity } from '@/modules/client/infra/database/entities'
import { YmhIntervieweeEntity } from '@/modules/ymh-questionnaire/infra/database/entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('ymh_questionnaires')
export class YmhQuestionnaireEntity {
  @PrimaryColumn({ nullable: false, unique: true })
  id: string

  @Column({ nullable: true })
  title?: string

  @Column({ nullable: false })
  status: string

  @Column()
  interviewer_id: string

  @Column()
  interviewee_id: string

  @Column({
    type: 'jsonb',
    default: {},
    array: false,
    nullable: false,
  })
  questionnaire: string

  @OneToOne(() => YmhIntervieweeEntity)
  @JoinColumn({ name: 'interviewee_id' })
  interviewee: YmhIntervieweeEntity

  @ManyToOne(() => ClientEntity)
  @JoinColumn({ name: 'interviewer_id' })
  interviewer: ClientEntity

  @Column({ type: 'timestamp', nullable: true })
  recall_date: Date

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
