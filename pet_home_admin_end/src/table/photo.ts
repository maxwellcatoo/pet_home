import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Photo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  petId: string; // 宠物id

  @Column()
  imgSrc: string; // 图片路径

  // TODO 这个怎么指定时间类型
  @Column()
  timestamp: number; // 拍摄时间
}
