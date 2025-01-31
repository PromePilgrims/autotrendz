import { ClientEntity } from '@/modules/client/infra/database/entities'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm'

@Entity('auth_recovery_hash')
export class RecoveryHashEntity {
  @PrimaryColumn({ unique: true })
  hash: string

  @Column()
  clientId: string

  @ManyToOne(() => ClientEntity)
  @JoinColumn({ name: 'clientId' })
  client: ClientEntity

  @Column({ type: 'timestamp' })
  expiresAt: Date

  @Column({ type: 'bool', default: false })
  used: boolean

  @CreateDateColumn()
  issuedAt: Date
}
