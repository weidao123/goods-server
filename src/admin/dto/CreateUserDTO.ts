import { IsString, MaxLength } from 'class-validator';

export class CreateUserDTO {
  @MaxLength(50)
  @IsString()
  public account: string;

  @MaxLength(50)
  @IsString()
  public password: string;

  @MaxLength(50)
  @IsString()
  public nickname: string;
}
