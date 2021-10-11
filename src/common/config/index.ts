import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';

interface AppConfig {
  db: TypeOrmModuleOptions;
  jwt: JwtModuleOptions;
}

export default () => {
  return {
    db: {
      type: 'mysql',
      host: '39.105.8.48',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'tx_goods',
      autoLoadEntities: true,
      synchronize: false,
      logging: true,
      maxQueryExecutionTime: 200,
    },
    jwt: {
      secret: 'asd9a9sdasdjadg',
      signOptions: {
        expiresIn: 60 * 60 * 8,
      },
    },
  } as AppConfig;
};
