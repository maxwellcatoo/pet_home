// user表

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  storeId: number; // 所属店铺

  @Column()
  phone: string;

  @Column()
  type: string; // 种类 [猫、狗]

  @Column()
  age: number;

  @Column()
  gender: string;
}
