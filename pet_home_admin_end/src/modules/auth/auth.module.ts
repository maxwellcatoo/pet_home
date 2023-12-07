import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AdminUserModule } from 'src/modules/admin_user/admin_user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [AdminUserModule, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
