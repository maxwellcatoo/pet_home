import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AdminUserToken } from './admin_user_token';
import { PetStore } from './pet_store';

@Entity()
export class AdminUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  account: string;

  @Column()
  password: string;

  @Column()
  nickName: string;

  @OneToOne(() => AdminUserToken)
  @JoinColumn()
  token: AdminUserToken;

  @OneToMany(() => PetStore, (petStore) => petStore.adminUser)
  petStores: PetStore[];
}
