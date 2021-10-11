import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

/**
 * 参数校验
 */
@Injectable()
export class ValidateParamPipe implements PipeTransform {
  public async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    if (metadata.metatype === String) {
      return value.toString();
    }
    if (metadata.metatype === Number) {
      const val = Number(value);
      if (isNaN(val)) {
        throw new HttpException('type error', HttpStatus.BAD_REQUEST);
      }
      return val;
    }

    const object = plainToClass(metadata.metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const msg = errors
        .map((m) => Object.values(m.constraints).join(','))
        .join(',');
      throw new HttpException(msg, HttpStatus.BAD_REQUEST);
    }
    return object;
  }
}
