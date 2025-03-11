import { Module } from '@nestjs/common';
import { PolygonController } from './controllers/polygon.controller';
import { PolygonService } from './services/polygon.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [PolygonController],
  providers: [PolygonService],
  exports: [PolygonService],
})
export class PolygonModule {}
