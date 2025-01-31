import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm'

@Entity('pastas')
export class Pasta {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  nome: string

  @Column('integer', { default: 0 })
  pasta_pai: number

  @OneToMany(() => Pasta, (pasta) => pasta.parent, { cascade: true })
  @JoinColumn({ name: 'pasta_pai' })
  sub_pastas: Pasta[]

  @ManyToOne(() => Pasta, (pasta) => pasta.sub_pastas)
  @JoinColumn({ name: 'pasta_pai' })
  parent: Pasta
}
