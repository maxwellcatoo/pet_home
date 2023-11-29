import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// 开启一些定期检查、清除缓存的任务

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
