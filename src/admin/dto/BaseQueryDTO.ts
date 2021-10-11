import { IsString } from 'class-validator';
import { SelectQueryBuilder } from 'typeorm';

export class BaseQueryDTO {
  @IsString()
  private size: string;

  @IsString()
  private page: string;

  public getSize(): number {
    return Number(this.size);
  }

  public getPage(): number {
    return Number(this.page);
  }

  public getSkip(): number {
    const skip = (this.getPage() - 1) * this.getSize();
    return skip < 0 ? 0 : skip;
  }

  public setSkipAndTake(queryBuilder: SelectQueryBuilder<any>) {
    queryBuilder.take(this.getSize());
    queryBuilder.skip(this.getSkip());
  }
}
