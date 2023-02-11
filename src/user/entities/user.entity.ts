import { compare, hash } from 'bcrypt';
import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CreatedAt, UpdatedAt } from '../../db/decorators';
import { PASSWORD_HASH_ROUNDS } from '../constants';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

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
