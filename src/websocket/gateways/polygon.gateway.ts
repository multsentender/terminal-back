import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConfigService } from '@nestjs/config';
import * as WebSocket from 'ws';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class PolygonGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private polygonWs: WebSocket;
  private readonly apiKey: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('polygon.apiKey');
    this.initPolygonConnection();
  }

  private initPolygonConnection() {
    this.polygonWs = new WebSocket(this.configService.get<string>('polygon.wsUrl'));

    this.polygonWs.on('open', () => {
      console.log('Connected to Polygon.io WebSocket');
      this.authenticate();
    });

    this.polygonWs.on('message', (data: WebSocket.Data) => {
      const message = JSON.parse(data.toString());
      this.server.emit('polygonData', message);
    });

    this.polygonWs.on('error', error => {
      console.error('Polygon.io WebSocket error:', error);
    });

    this.polygonWs.on('close', () => {
      console.log('Polygon.io WebSocket connection closed');
      setTimeout(() => this.initPolygonConnection(), 5000);
    });
  }

  private authenticate() {
    this.polygonWs.send(JSON.stringify({ action: 'auth', params: this.apiKey }));
  }

  @SubscribeMessage('subscribe')
  handleSubscribe(client: Socket, payload: string[]) {
    const message = {
      action: 'subscribe',
      params: payload.join(','),
    };
    this.polygonWs.send(JSON.stringify(message));
  }

  @SubscribeMessage('unsubscribe')
  handleUnsubscribe(client: Socket, payload: string[]) {
    const message = {
      action: 'unsubscribe',
      params: payload.join(','),
    };
    this.polygonWs.send(JSON.stringify(message));
  }

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }
}
