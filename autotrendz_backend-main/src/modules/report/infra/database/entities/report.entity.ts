import { ClientEntity } from '@/modules/client/infra/database/entities'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('clients_reports')
export class ReportEntity {
  @PrimaryColumn()
  id: string

  @ManyToMany(() => ClientEntity)
  @JoinTable({
    name: 'clients_reports_clients',
    inverseJoinColumn: { name: 'id' },
  })
  clients: ClientEntity[]

  @Column()
  name: string

  @Column()
  workspaceId: string

  @Column()
  reportId: string

  @Column()
  createdBy: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
