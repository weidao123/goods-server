import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  /**
   * 主键ID
   */
  @PrimaryGeneratedColumn('increment')
  public id: number;

  /**
   * 创建时间
   */
  @CreateDateColumn({ name: 'created', type: 'datetime' })
  public created: Date;

  /**
   * 修改时间
   */
  @UpdateDateColumn()
  public updated: Date;

  /**
   * 删除时间
   */
  @DeleteDateColumn({ select: false })
  public deleted: Date;
}
