/**
 * 业务异常枚举
 */
export class ExceptionEnum {
  public msg: string;
  public status: number;

  public constructor(msg: string, status = 0) {
    this.msg = msg;
    this.status = status;
  }

  public static ACCOUNT_OR_PWD_ERROR = new this('用户名或密码错误');
  public static ACCOUNT_OR_NICKNAME_EXIST = new this('账号或用户名已经存在');
}
