import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'

@Entity('powerbi_activity_history')
export class ActivityHistory {
  @PrimaryColumn()
  id: string

  @Column()
  activity: string

  @CreateDateColumn()
  occurredAt: Date

  @Column({ type: 'json', nullable: true })
  data?: string

  @Column()
  triggeredBy: string
}
