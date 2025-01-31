import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'

@Entity('web_contacts')
export class ContactEntity {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  tel: string

  @Column()
  message: string

  @Column({ nullable: true })
  ip: string

  @CreateDateColumn()
  created_at: Date

  static create(data: Partial<ContactEntity>): ContactEntity {
    return Object.assign(new ContactEntity(), data)
  }
}
