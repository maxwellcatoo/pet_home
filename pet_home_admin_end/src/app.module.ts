import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // 使用数据库

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { isDev } from './config/env';

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
      entities: ['./table/*/*.ts'], // 导入table目录下定义的所有entity类
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
