import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PermissionResourceRoute } from '../../common/entity/PermissionResourceRoute';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PermissionResourceRouteService {
  @InjectRepository(PermissionResourceRoute)
  private readonly routeRepository: Repository<PermissionResourceRoute>;
}
