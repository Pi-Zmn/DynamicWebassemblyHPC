import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { DashboardSocketService } from './dashboard-socket.service';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway(3001)
export class DashboardSocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly dashboardSocketService: DashboardSocketService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(@ConnectedSocket() client: Socket) {
    Logger.log(`dashboard-WS (${client.id}) connected`);

    Logger.log(client.id)
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    Logger.log(`dashboard-WS (${client.id}) disconnected`);

    Logger.log(client.id)
  }
}
