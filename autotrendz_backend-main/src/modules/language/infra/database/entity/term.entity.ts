import { TranslationEntity } from '@/modules/language/infra/database/entity'

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('i18n_terms')
export class TermEntity {
  @PrimaryColumn()
  id: string

  @Column()
  section: string

  @Column()
  name: string

  @Column()
  code: string

  @Column({ type: 'boolean', default: false })
  completed: boolean

  @OneToMany(() => TranslationEntity, (translation) => translation.term, {
    cascade: true,
  })
  @JoinColumn({ name: 'term_id' })
  translations: TranslationEntity[]

  @Column()
  created_by: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
