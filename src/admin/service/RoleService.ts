import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import Role from '../../common/entity/Role';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleService {
  @InjectRepository(Role)
  public roleRepository: Repository<Role>;
}
