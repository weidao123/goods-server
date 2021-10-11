import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ResponseUtil } from '../../common/utils/ResponseUtil';

/**
 * 响应参数拦截
 */
@Injectable()
export class ResponseParamInterceptor implements NestInterceptor {
  public intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(map((data) => ResponseUtil.success(data)));
  }
}
