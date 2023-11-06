// user表

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// TODO 过期的token要怎么处理呢？设置一个定时器，定期清理？

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uid: string; // 用户id

  @Column()
  token: string;

  @Column()
  deadline: number; // 过期时间
}
