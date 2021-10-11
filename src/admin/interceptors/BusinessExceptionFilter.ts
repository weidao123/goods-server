import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseUtil } from '../../common/utils/ResponseUtil';
import { BusinessException } from '../utils/BusinessException';

/**
 * 过滤业务异常
 */
@Catch(BusinessException, HttpException)
export class BusinessExceptionFilter implements ExceptionFilter {
  public catch(exception: BusinessException, host: ArgumentsHost): any {
    const response = host.switchToHttp().getResponse<Response>();
    response
      .status(exception.getStatus())
      .json(ResponseUtil.error(exception.getResponse().toString()));
  }
}
