import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  followStore: string; // 关注的店铺

  @Column()
  followPet: string; // 关注的宠物

  @Column()
  phone: string;

  @Column()
  wechat: string;
}
