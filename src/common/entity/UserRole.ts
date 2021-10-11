import { Column, Entity } from 'typeorm';
import { BaseEntity } from './BaseEntity';

/**
 * 用户、角色关联实体
 */
@Entity('bd_user_role')
export class UserRole extends BaseEntity {
  /**
   * 角色ID
   */
  @Column({ name: 'role_id' })
  public roleId: number;

  /**
   * 用户ID
   */
  @Column({ name: 'user_id' })
  public userId: number;
}
