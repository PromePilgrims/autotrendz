import { ClientEntity } from '@/modules/client/infra/database/entities'
import { FileEntity } from '@/modules/folder/infra/database/entity/file.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('folders')
export class FolderEntity {
  @PrimaryColumn()
  id: string

  @Column({ nullable: true })
  parent_id?: string

  @Column()
  name: string

  @OneToMany(() => FolderEntity, (folder) => folder.parent, { cascade: true })
  @JoinColumn({ name: 'parent_id' })
  sub_folders: FolderEntity[]

  @OneToMany(() => FileEntity, (file) => file.parent, { cascade: true })
  @JoinColumn({ name: 'parent_id' })
  files: FileEntity[]

  @ManyToOne(() => FolderEntity, (folder) => folder.sub_folders)
  @JoinColumn({ name: 'parent_id' })
  parent: FolderEntity

  @ManyToMany(() => ClientEntity)
  @JoinTable({
    name: 'folder_clients',
    joinColumn: { name: 'folder_id' },
    inverseJoinColumn: { name: 'client_id' },
  })
  clients: ClientEntity[]

  @Column()
  created_by: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  isRootFolder(): boolean {
    return !this.parent_id
  }

  hasClient(client_id: string): boolean {
    return (
      this.clients.find((client) => client.id.toString() == client_id) != null
    )
  }
}
