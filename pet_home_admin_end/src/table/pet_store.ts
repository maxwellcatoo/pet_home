// user表

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PetStore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uid: string; // 账号id

  @Column()
  storeName: string; // 店名

  @Column()
  address: string; // 地址
}
