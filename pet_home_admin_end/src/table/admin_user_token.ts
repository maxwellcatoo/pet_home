import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AdminUser } from './admin_user';

// TODO 过期的token要怎么处理呢？设置一个定时器，定期清理？

@Entity()
export class AdminUserToken extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uid: number;

  @Column()
  token: string;

  @Column()
  expireTime: number; // 过期时间

  @OneToOne(() => AdminUser)
  @JoinColumn()
  adminUser: AdminUser;
}
