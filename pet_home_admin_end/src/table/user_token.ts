import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user';

// TODO 过期的token要怎么处理呢？设置一个定时器，定期清理？

@Entity()
export class UserToken extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uid: string;

  @Column()
  token: string;

  @Column()
  expireTime: number; // 过期时间

  @OneToOne(() => User)
  @JoinColumn()
  adminUser: User;
}
