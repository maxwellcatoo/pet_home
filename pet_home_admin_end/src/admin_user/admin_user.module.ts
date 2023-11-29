import { Module } from '@nestjs/common';
import { AdminUserService } from './admin_user.service';
import { AdminUserController } from './admin_user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUser } from 'src/table/admin_user';
import { AdminUserToken } from 'src/table/admin_user_token';

@Module({
  imports: [TypeOrmModule.forFeature([AdminUser, AdminUserToken])],
  controllers: [AdminUserController],
  providers: [AdminUserService],
})
export class AdminUserModule {}
