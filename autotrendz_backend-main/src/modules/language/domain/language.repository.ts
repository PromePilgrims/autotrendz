import { Term } from '@/modules/language/domain/entity'
import { Language } from '@/modules/language/domain/language'

export type Where = {
  id?: string
  code?: string
}

export type FindByLanguage = {
  language_id: string
}

export interface IRepository<T> {
  save(domainEntity: T): Promise<void>
  findBy(where: Where): Promise<T>
  findAll(): Promise<T[]>
}

export interface ILanguageRepository extends IRepository<Language> {}
export interface ITermRepository extends IRepository<Term> {
  findAllByLanguage(where: FindByLanguage): Promise<Term[]>
}
