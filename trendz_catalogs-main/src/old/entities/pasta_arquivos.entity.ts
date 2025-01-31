import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('pastas_arquivos')
export class PastaArquivo {
  @PrimaryGeneratedColumn()
  id: number

  @Column('integer')
  pasta_id: number

  @Column('varchar')
  descricao: string

  @Column('varchar')
  arquivo: string
}
