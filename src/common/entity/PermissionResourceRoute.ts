import { BaseEntity } from './BaseEntity';
import { Column, Entity } from 'typeorm';

/**
 * 权限资源表：路由表
 */
@Entity('bd_permission_resource_route')
export class PermissionResourceRoute extends BaseEntity {
  /**
   * 路由path
   */
  @Column()
  public path: string;

  /**
   * 请求方法
   */
  @Column()
  public method: string;
}
