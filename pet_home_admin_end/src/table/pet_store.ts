import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AdminUser } from './admin_user';

@Entity()
export class PetStore extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AdminUser)
  adminUser: AdminUser;

  @Column()
  storeName: string; // 店名

  @Column()
  address: string; // 地址
}
