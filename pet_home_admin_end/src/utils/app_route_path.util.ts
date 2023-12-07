import { existsSync } from 'fs';
import { join, parse, resolve } from 'path';

/**
 * 获取应用根目录
 * @returns 应用根目录
 */
export function getAppRootPath(): string {
  // check for environmental variable
  if (process.env.APP_ROOT_PATH) {
    return resolve(process.env.APP_ROOT_PATH);
  }
  // 逐级查找node_modules目录
  let cur = __dirname;
  const root = parse(cur).root;

  let appRootPath = '';
  while (cur) {
    if (
      existsSync(join(cur, 'node_modules')) &&
      existsSync(join(cur, 'package.json'))
    ) {
      // 如果存在node_modules、package.json
      // 这里不能break，因为如果再向外找又找到了node_modules、package.json的话，要以外部的为主
      appRootPath = cur;
    }
    // 已经为根路径，无需向上查找
    if (root === cur) {
      break;
    }

    // 继续向上查找
    cur = resolve(cur, '..');
  }

  if (appRootPath) {
    process.env.APP_ROOT_PATH = appRootPath;
  }
  return appRootPath;
}
