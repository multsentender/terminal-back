import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PolygonService } from '../services/polygon.service';

@Controller('polygon')
@UseGuards(JwtAuthGuard)
export class PolygonController {
  constructor(private readonly polygonService: PolygonService) {}

  @Get('forex/pairs')
  async getForexPairs() {
    return this.polygonService.getForexPairs();
  }

  @Get('forex/quotes')
  async getForexQuotes(@Query('from') from: string, @Query('to') to: string) {
    return this.polygonService.getForexQuotes(from, to);
  }

  @Get('forex/aggregates')
  async getForexAggregates(
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('multiplier') multiplier: number,
    @Query('timespan') timespan: string,
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    return this.polygonService.getForexAggregates(from, to, multiplier, timespan, start, end);
  }
}
