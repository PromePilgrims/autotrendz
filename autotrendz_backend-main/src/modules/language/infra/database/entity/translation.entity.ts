import {
  LanguageEntity,
  TermEntity,
} from '@/modules/language/infra/database/entity'

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('i18n_translations')
export class TranslationEntity {
  @PrimaryColumn()
  id: string

  @Column()
  term_id: string

  @Column()
  language_id: string

  @Column()
  translation: string

  @ManyToOne(() => TermEntity, (term) => term.translations, {
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'term_id' })
  term: TermEntity

  @ManyToOne(() => LanguageEntity, (language) => language.translations)
  @JoinColumn({ name: 'language_id' })
  language: LanguageEntity

  @Column()
  created_by: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
