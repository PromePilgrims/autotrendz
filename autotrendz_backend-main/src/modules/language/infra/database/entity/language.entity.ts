import { TranslationEntity } from '@/modules/language/infra/database/entity'

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('i18n_languages')
export class LanguageEntity {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column({ unique: true })
  code: string

  @Column({ type: 'boolean', default: true })
  active: boolean

  @OneToMany(() => TranslationEntity, (translation) => translation.language, {
    cascade: true,
  })
  translations: TranslationEntity[]

  @Column()
  created_by: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
