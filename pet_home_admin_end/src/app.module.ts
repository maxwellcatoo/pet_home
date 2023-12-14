import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm'; // 使用数据库
import { join } from 'path';
import { Connection } from 'typeorm';
import { AdminUserModule } from './modules/admin_user/admin_user.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { isDev } from './config/env';
import { HttpExceptionFilter } from './shared/interceptor/fail_response.interceptor';
import { TransformInterceptor } from './shared/interceptor/success_response.interceptor';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './modules/shared/shared.module';
import { AuthService } from './modules/auth/auth.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'cat_home_admin',
      autoLoadEntities: true, // 自动加载实体类去映射到数据库
      synchronize: isDev(), // 是否同步本地的修改到数据库（dev环境打开，生产环境绝对不能打开）
      // entities配置，直接写路径会报错，原因是这样写会导致程序尝试在ts在js上下文中导入文件
      // 详细内容链接：https://stackoverflow.com/questions/59435293/typeorm-entity-in-nestjs-cannot-use-import-statement-outside-a-module
      entities: [join(__dirname, '**', '*.{ts,js}')], // 导入table目录下定义的所有entity类
      // entities: [AdminUser, PetStore, User, Pet, Photo, Token],
    }),
    AdminUserModule,
    AuthModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthService,
    // 成功response拦截器，对请求成功的response数据进行统一包装
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    // 失败请求拦截器（访问非正常路由时触发）
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
