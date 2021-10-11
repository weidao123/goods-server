import { Module } from '@nestjs/common';
import { CommonModule } from '../common/CommonModule';
import { UserController } from './controller/UserController';
import { BusinessExceptionFilter } from './interceptors/BusinessExceptionFilter';
import { ResponseParamInterceptor } from './interceptors/ResponseParamInterceptor';
import { ValidateParamPipe } from './interceptors/ValidateParamPipe';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { UserService } from './service/UserService';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './interceptors/AuthGuard';
import { ConfigService } from '@nestjs/config';
import { RoleService } from './service/RoleService';
import { PermissionResourceRouteService } from './service/PermissionResourceRouteService';
import { AuthService } from './service/AuthService';

@Module({
  imports: [
    CommonModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('jwt'),
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    RoleService,
    AuthService,
    PermissionResourceRouteService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseParamInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: BusinessExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidateParamPipe,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AdminModule {}
