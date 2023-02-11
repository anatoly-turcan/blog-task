import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Permissions } from '../constants';

@Entity()
export default class Permission {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column()
  name: Permissions;

  @Column({ nullable: true })
  @Exclude()
  description?: string;
}
