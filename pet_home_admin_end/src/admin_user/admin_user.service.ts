import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
  ) {}

  // 自动登录
  async autoLogin(uid: number, token: string): Promise<boolean> {
    const userToken = await this.adminUserTokenRepository.findOne({
      where: { token: token },
    });
    if (userToken === null) return false;
    if (Date.now() > userToken.expireTime) return false;
    return userToken.adminUser.id === uid;
  }

  // 账号密码登录
  async login(account: string, password: string): Promise<any> {
    const admin = await this.adminUserRepository.findOne({
      where: { account: account },
    });
    if (admin === null) {
      return { code: 204, desc: '账号不存在' };
    }
    if (admin.password === password) {
      // 登录成功需要更新token值
      return { desc: 'login success' };
    }

    return { code: 204, desc: 'login fail' };
  }

  findAll(): Promise<AdminUser[]> {
    return this.adminUserRepository.find();
  }

  findOne(id: number): Promise<AdminUser> {
    return this.adminUserRepository.findOne({ where: { id: id } });
  }

  async remove(id: string): Promise<void> {
    await this.adminUserRepository.delete(id);
  }
}
