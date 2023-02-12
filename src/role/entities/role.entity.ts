import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Permissions } from '../constants';
import Permission from './permission.entity';

@Entity()
export default class Role {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Permission, { eager: true })
  @JoinTable({ name: 'role_permission' })
  permissions: Permission[];

  hasPermission(name: Permissions) {
    return this.permissions.some((p) => p.name === name);
  }

  hasAtLeastOnePermission(requiredPermissions: Permissions[]) {
    return requiredPermissions.some((rp) =>
      this.permissions.some((p) => p.name === rp),
    );
  }
}
