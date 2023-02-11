import { compare, hash } from 'bcrypt';
import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { Permissions } from 'src/role/constants';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CreatedAt, UpdatedAt } from '../../db/decorators';
import Role from '../../role/entities/role.entity';
import { PASSWORD_HASH_ROUNDS } from '../constants';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roleId: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @CreatedAt()
  @Exclude()
  createdAt: Date;

  @UpdatedAt()
  @Exclude()
  updatedAt: Date;

  @OneToOne(() => Role, { eager: true })
  @JoinColumn()
  role: Role;

  hasPermission(name: Permissions) {
    return this.role.hasPermission(name);
  }

  hasAtLeastOnePermission(requiredPermissions: Permissions[]) {
    return this.role.hasAtLeastOnePermission(requiredPermissions);
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, PASSWORD_HASH_ROUNDS);
  }

  @BeforeUpdate()
  async beforeUpdate() {
    this.updatedAt = new Date();
  }

  async comparePassword(password: string) {
    return compare(password, this.password);
  }
}
