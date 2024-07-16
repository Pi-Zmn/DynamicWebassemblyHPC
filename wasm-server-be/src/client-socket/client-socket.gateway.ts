import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ClientSocketService } from './client-socket.service';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { ClientInfo } from './entity/workerclient.entity';

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class ClientSocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly clientSocketService: ClientSocketService) {}

  @WebSocketServer()
  server: Server;
  
  handleConnection(@ConnectedSocket() client: Socket) {
    Logger.log(`client-WS (${client.id}) connected`);

    this.clientSocketService.create(client.id);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    Logger.log(`client-WS (${client.id}) disconnected`);

    this.clientSocketService.remove(client.id);
  }

  @SubscribeMessage('client-info')
  handleClientInfo(
    @MessageBody() clientInfo: ClientInfo | undefined,
    @ConnectedSocket() client: Socket
  ) {
    this.clientSocketService.setClientInfo(client.id, clientInfo)
  }
}
