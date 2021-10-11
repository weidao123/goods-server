import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import AppConfig from './config';
import { ResponseUtil } from './utils/ResponseUtil';
import User from './entity/User';
import Role from './entity/Role';
import { UserRole } from './entity/UserRole';
import { RolePermissionResource } from './entity/RolePermissionResource';
import { PermissionResourceRoute } from './entity/PermissionResourceRoute';

const entity = [
  User,
  Role,
  UserRole,
  RolePermissionResource,
  PermissionResourceRoute,
];

const ormRootModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => {
    return config.get('db');
  },
});

const configModule = ConfigModule.forRoot({
  isGlobal: true,
  load: [AppConfig],
});

@Module({
  imports: [TypeOrmModule.forFeature(entity), configModule, ormRootModule],
  controllers: [],
  providers: [ResponseUtil],
  exports: [TypeOrmModule],
})
export class CommonModule {}
