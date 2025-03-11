import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class PolygonService {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://api.polygon.io/v2';

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('polygon.apiKey');
  }

  private getHeaders() {
    return {
      Authorization: `Bearer ${this.apiKey}`,
    };
  }

  async getForexPairs() {
    const response = await axios.get(`${this.baseUrl}/aggs/forex/now`, {
      headers: this.getHeaders(),
    });
    return response.data;
  }

  async getForexQuotes(from: string, to: string) {
    const response = await axios.get(`${this.baseUrl}/quotes/C:${from}${to}`, {
      headers: this.getHeaders(),
    });
    return response.data;
  }

  // eslint-disable-next-line prettier/prettier
  async getForexAggregates(
    from: string,
    to: string,
    multiplier: number,
    timespan: string,
    start: string,
    end: string,
  ) {
    const response = await axios.get(
      `${this.baseUrl}/aggs/forex/${from}/${to}/range/${multiplier}/${timespan}/${start}/${end}`,
      {
        headers: this.getHeaders(),
      },
    );
    return response.data;
  }
}
