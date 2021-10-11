import { Column, Entity } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import Role from './Role';

/**
 * 后台用户表
 */
@Entity('bd_user')
export default class User extends BaseEntity {
  /**
   * 账户昵称
   */
  @Column()
  public nickname: string;

  /**
   * 账号
   */
  @Column()
  public account: string;

  /**
   * 密码
   */
  @Column()
  public password: string;

  @Column({ name: 'role_id' })
  public roleId: number;

  public role: Role;
}
