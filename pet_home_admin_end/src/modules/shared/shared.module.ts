import { Global, Module } from '@nestjs/common';
import { LoggerService } from 'src/shared/logger/logger.service';

@Global()
@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class SharedModule {}
