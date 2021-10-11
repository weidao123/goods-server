import { Module } from '@nestjs/common';
import { AdminModule } from './admin/AdminModule';
import { CommonModule } from './common/CommonModule';

@Module({
  imports: [AdminModule],
  providers: [CommonModule],
})
export class AppModule {}
