import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CreatedAt, UpdatedAt } from '../../db/decorators';
import User from '../../user/entities/user.entity';

@Entity()
export default class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column('text')
  text: string;

  @Column({ default: false })
  isHidden: boolean;

  @CreatedAt()
  createdAt: Date;

  @UpdatedAt()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @BeforeUpdate()
  async beforeUpdate() {
    this.updatedAt = new Date();
  }
}
