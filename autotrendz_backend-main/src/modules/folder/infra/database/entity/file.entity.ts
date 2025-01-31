import { FolderEntity } from '@/modules/folder/infra/database/entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('folder_files')
export class FileEntity {
  @PrimaryColumn()
  id: string

  @Column()
  parent_id: string

  @Column()
  name: string

  @Column()
  src: string

  @Column()
  mimetype: string

  @Column()
  size: number

  @ManyToOne(() => FolderEntity, (folder) => folder.files)
  @JoinColumn({ name: 'parent_id' })
  parent: FolderEntity

  @Column()
  created_by: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
