import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from 'express';
import { PetResponse } from 'src/types/custom_response_type';

interface Response {
  data: PetResponse;
}

@Injectable()
export class TransformInterceptor
  implements NestInterceptor<PetResponse, Response>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<PetResponse>,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    Logger.log(request.url, '正常接口请求');

    return next.handle().pipe(
      map((data) => {
        return {
          data: data.data,
          statusCode: data.code !== undefined ? data.code : 200,
          message: data.desc,
        };
      }),
    );
  }
}
