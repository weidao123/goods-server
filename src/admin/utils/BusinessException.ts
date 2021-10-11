import { HttpException } from '@nestjs/common';
import { ExceptionEnum } from '../constant/ExceptionEnum';

export class BusinessException extends HttpException {
  constructor(e: ExceptionEnum) {
    super(e.msg, 200);
  }
}
