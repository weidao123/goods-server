/**
 * 接口返回结构体
 */
import { Injectable } from '@nestjs/common';

export class HttpResult<T> {
  public data: T;
  public message: string;
  public success: boolean;

  public constructor(data: T, message: string, success: boolean) {
    this.data = data;
    this.message = message;
    this.success = success;
  }
}

@Injectable()
export class ResponseUtil {
  public static success<T>(data: T, msg = 'success') {
    return new HttpResult(data, msg, true);
  }

  public static error(msg = 'success') {
    return new HttpResult(null, msg, false);
  }
}
