import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../dto/CreateUserDTO';
import { Repository } from 'typeorm';
import User from '../../common/entity/User';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDTO } from '../dto/LoginDTO';
import { BusinessException } from '../utils/BusinessException';
import { ExceptionEnum } from '../constant/ExceptionEnum';
import { QueryUserDTO } from '../dto/QueryUserDTO';
import { QueryPageResult } from '../dto/QueryPageResult';
import Role from '../../common/entity/role';
import { JwtService } from '@nestjs/jwt';

const md5 = require('md5');

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @Inject()
  private jwtService: JwtService;
  /**
   * 创建后台用户
   *
   * @param user
   */
  public async create(user: CreateUserDTO) {
    const backendUser = new User();
    Object.assign(backendUser, user);
    backendUser.password = md5(backendUser.password);

    const queryRes = await this.userRepository
      .createQueryBuilder()
      .where('account = :account', { account: backendUser.account })
      .orWhere('nickname = :name', { name: backendUser.nickname })
      .getOne();

    if (queryRes) {
      throw new BusinessException(ExceptionEnum.ACCOUNT_OR_NICKNAME_EXIST);
    }

    return await this.userRepository.save(backendUser);
  }

  /**
   * 分页查询系统用户列表
   *
   * @param query
   */
  public async findList(query: QueryUserDTO) {
    const builder = this.userRepository.createQueryBuilder('backendUser');
    query.setSkipAndTake(builder);

    if (query.nickname) {
      builder
        .where('nickname like :nickname')
        .setParameter('nickname', `%${query.nickname}%`);
    }
    // builder.leftJoinAndSelect('backendUser.role', 'backendRole');
    builder.leftJoinAndMapOne(
      'backendUser.role',
      Role,
      'role',
      'role.id = backendUser.role_id',
    );
    const [list, count] = await builder.getManyAndCount();
    return new QueryPageResult(list, count);
  }

  /**
   * 登录
   *
   * @param login
   */
  public async login(login: LoginDTO) {
    const res = await this.userRepository.findOne({
      account: login.account,
      password: md5(login.password),
    });

    if (!res) {
      throw new BusinessException(ExceptionEnum.ACCOUNT_OR_PWD_ERROR);
    }

    const token = this.jwtService.sign({ id: res.id });
    return {
      ...res,
      token: token,
    };
  }
}
