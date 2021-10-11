import { BaseEntity } from './BaseEntity';
import { Column, Entity } from 'typeorm';

/**
 * 角色、权限资源关联表（菜单、路由）
 */
@Entity('bd_role_permission_resource')
export class RolePermissionResource extends BaseEntity {
  /**
   * 资源ID（菜单ID、路由ID）
   */
  @Column({ name: 'access_id' })
  public accessId: number;

  /**
   * 角色ID
   */
  @Column({ name: 'role_id' })
  public roleId: number;
}
