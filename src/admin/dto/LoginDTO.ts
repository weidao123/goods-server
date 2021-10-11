import { IsString, MaxLength } from 'class-validator';

export class LoginDTO {
  @MaxLength(50)
  @IsString()
  public account: string;

  @MaxLength(50)
  @IsString()
  public password: string;
}
