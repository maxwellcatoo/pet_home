import { AdminUser } from 'src/table/admin_user';
import { AdminUserToken } from 'src/table/admin_user_token';

export function generateAdminToken(uid: number): AdminUserToken {
  const adminToken = new AdminUserToken();
  adminToken.uid = uid;
  adminToken.token = generateTokenStr();
  adminToken.expireTime = Date.now();
  return adminToken;
}

function generateTokenStr(): string {
  return '';
}
