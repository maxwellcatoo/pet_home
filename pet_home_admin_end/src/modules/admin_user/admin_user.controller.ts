import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { LoggerService } from 'src/shared/logger/logger.service';
import { AdminUserService } from './admin_user.service';

@Controller('admin_user')
export class AdminUserController {
  constructor(
    private readonly adminUserService: AdminUserService,
    private readonly logger: LoggerService,
  ) {}

  /// 登录
  @Post('login')
  @HttpCode(200)
  async login(@Body() body: any): Promise<any> {
    // 参数错误，直接返回
    if (!body.account && !body.password) {
      return { code: 400, desc: '参数错误' };
    }
    return this.adminUserService.login(body.account, body.password);
  }

  /// 自动登录，使用uid和token字段
  @Post('auto_login')
  @HttpCode(200)
  async autoLogin(@Body() body: any): Promise<any> {
    console.log('body', body);
    if (body.uid === undefined) {
      return { code: 401, desc: 'no uid' };
    }
    if (body.token === undefined || body.token === '') {
      return { code: 401, desc: 'no token' };
    }

    const autoLoginRes = await this.adminUserService.autoLogin(
      body.uid,
      body.token,
    );
    return autoLoginRes
      ? { desc: 'login success' }
      : { code: 202, desc: 'login fail' };
  }

  @Get('test')
  async test() {
    this.logger.log('hello world my friends');
    return 'hello world test';
  }
}
