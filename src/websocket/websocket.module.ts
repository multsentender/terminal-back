import { Module } from '@nestjs/common';
import { PolygonGateway } from './gateways/polygon.gateway';

@Module({
  providers: [PolygonGateway],
  exports: [PolygonGateway],
})
export class WebSocketModule {}
