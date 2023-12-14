import { Injectable } from '@nestjs/common';
import { AdminUserService } from 'src/modules/admin_user/admin_user.service';
import { LoggerService } from 'src/shared/logger/logger.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminUserService: AdminUserService,
    private readonly logger: LoggerService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.adminUserService.findOne(username);
    if (user && user.password === password) {
      const { password: __, ...result } = user;
      return JSON.stringify(result);
    }
    return null;
  }
}
