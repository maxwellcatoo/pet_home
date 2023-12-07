import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './shared/logger/logger.service';

// 开启一些定期检查、清除缓存的任务

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 配置日志系统
  app.useLogger(app.get(LoggerService));

  const loggerService = app.get(LoggerService);
  loggerService.log('service is runnning at localhost:3000');
  await app.listen(3000);
}
bootstrap();
