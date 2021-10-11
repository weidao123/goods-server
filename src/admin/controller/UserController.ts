import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { CreateUserDTO } from '../dto/CreateUserDTO';
import { UserService } from '../service/UserService';
import { LoginDTO } from '../dto/LoginDTO';
import { QueryUserDTO } from '../dto/QueryUserDTO';
import { PassAuth } from '../decorate/PassAuth';

@Controller('/admin/user')
export class UserController {
  @Inject()
  private readonly userService: UserService;

  @Post()
  public createUser(@Body() user: CreateUserDTO) {
    return this.userService.create(user);
  }

  @Get()
  public async findList(@Query() query: QueryUserDTO) {
    return await this.userService.findList(query);
  }

  @PassAuth()
  @Post('/login')
  public login(@Body() loginDTO: LoginDTO) {
    return this.userService.login(loginDTO);
  }
}
