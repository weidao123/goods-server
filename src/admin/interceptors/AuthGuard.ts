import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

interface JwtContent {
  id: number;
}

/**
 * 鉴权守卫
 */
@Injectable()
export class AuthGuard implements CanActivate {
  @Inject()
  private jwtService: JwtService;

  public canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    const token = request.header('Authriozation');

    const passAuth = Reflect.getMetadata('PASS_AUTH', context.getHandler());
    if (passAuth) {
      return true;
    }

    if (!token) {
      throw new HttpException('请先登录', HttpStatus.NOT_ACCEPTABLE);
    }
    try {
      const jwtContent = this.jwtService.verify<JwtContent>(token);
      request.headers['USER_ID'] = jwtContent.id.toString();
    } catch (e) {
      throw new HttpException('登录凭证已失效', HttpStatus.NOT_ACCEPTABLE);
    }
    return true;
  }
}
