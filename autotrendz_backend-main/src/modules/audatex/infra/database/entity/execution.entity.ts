import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('audatex_executions')
export class ExecutionEntity {
  @PrimaryColumn()
  id: string

  @Column()
  status: 'running' | 'completed'

  @Column()
  source_file_name: string

  @Column({
    type: 'jsonb',
    default: {},
    array: false,
  })
  source_temp_file_data: string

  @Column({ nullable: true })
  output_file_url?: string

  @Column()
  triggered_by: string

  @CreateDateColumn()
  triggered_at: Date

  @UpdateDateColumn()
  completed_at: Date
}
