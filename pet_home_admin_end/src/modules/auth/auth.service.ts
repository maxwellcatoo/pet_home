import { Injectable } from '@nestjs/common';
import { AdminUserService } from 'src/modules/admin_user/admin_user.service';

@Injectable()
export class AuthService {
  constructor(private readonly adminUserService: AdminUserService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.adminUserService.findOne(username);
    // TODO 密码需要经过加密处理后，存储到数据库中
    if (user && user.password === password) {
      const { password: __, ...result } = user;
      return result;
    }
    return null;
  }
}
