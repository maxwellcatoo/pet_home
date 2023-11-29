import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  storeId: number; // 所属店铺

  @Column()
  bigType: string; // 大种类 [猫、狗]

  @Column()
  smallType: string; // 小种类 [哈士奇、布偶]

  @Column()
  birth: number; // 出生日期（可计算出 年龄 和 生日）

  @Column()
  gender: string;
}
