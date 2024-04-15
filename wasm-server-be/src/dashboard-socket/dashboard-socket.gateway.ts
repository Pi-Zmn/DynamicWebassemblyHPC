import { ClientSocketService } from './../client-socket/client-socket.service';
import { WorkerClient } from './../client-socket/entity/workerclient.entity';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { DashboardSocketService } from './dashboard-socket.service';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@WebSocketGateway(3001)
export class DashboardSocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly dashboardSocketService: DashboardSocketService,
    private readonly clientSocketService: ClientSocketService
  ) {}

  @WebSocketServer()
  server: Server;

  handleConnection(@ConnectedSocket() client: Socket) {
    Logger.log(`dashboard-WS (${client.id}) connected`);
    this.server.to(client.id).emit(
      'client-update', 
      [...this.clientSocketService.connectedWorkerClients.values()]
    )
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    Logger.log(`dashboard-WS (${client.id}) disconnected`);
  }

  @OnEvent('workerclient-update')
  sendConnectedClientInfo(connectedClients: WorkerClient[]) {
    this.server.emit('client-update', connectedClients)
  }
}
