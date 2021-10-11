import { Column, Entity } from 'typeorm';
import { BaseEntity } from './BaseEntity';

/**
 * 后台用户表
 */
@Entity('bd_role')
export default class Role extends BaseEntity {
  /**
   * 角色名称
   */
  @Column()
  public name: string;

  /**
   * 创建人
   */
  @Column()
  public creator: string;
}
