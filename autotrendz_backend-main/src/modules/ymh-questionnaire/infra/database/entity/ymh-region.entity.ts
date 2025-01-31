import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'

@Entity('ymh_regions')
export class YmhRegionEntity {
  @PrimaryColumn({ nullable: false, unique: true })
  id: string

  @Column({ nullable: false })
  name: string

  @Column({ nullable: false })
  description: string

  @CreateDateColumn()
  created_at: Date
}
