import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggerService } from 'src/shared/logger/logger.service';
import { AdminUser } from 'src/table/admin_user';
import { AdminUserToken } from 'src/table/admin_user_token';
import { Repository } from 'typeorm';

@Injectable()
export class AdminUserService {
  constructor(
    @InjectRepository(AdminUser)
    private adminUserRepository: Repository<AdminUser>,
    @InjectRepository(AdminUserToken)
    private adminUserTokenRepository: Repository<AdminUserToken>,
    private readonly logger: LoggerService,
  ) {}

  // 账号密码登录
  async login(account: string, password: string): Promise<any> {
    // FIXME 这里，如果传入的account为undefined，竟然会返回数据库该表中的第一个数据。。。这我有点不能理解
    const admin = await this.adminUserRepository.findOne({
      where: { account: account },
    });
    if (admin === null) {
      this.logger.log(
        `账号不存在：account: ${account}   password: ${password}`,
        '登录',
      );
      return { code: 204, desc: '账号不存在' };
    }

    // TODO 密码需要经过加密处理后，存储到数据库中
    // 这里比对，也应该用加密后的密码比对数据库中存储的加密后密码
    if (admin.password === password) {
      // 登录成功需要更新并返回token值
      return { data: { uid: admin.id, token: 'token' }, desc: 'login success' };
    }
    this.logger.log(`account: ${admin.account}    password: ${admin.password}`);
    this.logger.log(`account: ${account}    password: ${password}`);
    return { code: 204, desc: 'login fail' };
  }

  // 自动登录
  async autoLogin(uid: number, token: string): Promise<boolean> {
    const userToken = await this.adminUserTokenRepository.findOne({
      where: { token: token },
    });
    if (userToken === null) return false;
    if (Date.now() > userToken.expireTime) return false;
    return userToken.adminUser.id === uid;
  }

  findOne(account: string): Promise<AdminUser> {
    return this.adminUserRepository.findOne({ where: { account: account } });
  }
}
