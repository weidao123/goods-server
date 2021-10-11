/**
 * 分页结构体
 */
export class QueryPageResult<T> {
  public list: T[];
  public count: number;

  public constructor(list: T[], count: number) {
    this.list = list;
    this.count = count;
  }
}
