import { Module } from '@nestjs/common';
import { ClientSocketService } from './client-socket.service';
import { ClientSocketGateway } from './client-socket.gateway';

@Module({
  providers: [ClientSocketGateway, ClientSocketService],
  exports: [ClientSocketService]
})
export class ClientSocketModule {}
