import { Module } from '@nestjs/common';
import { DashboardSocketService } from './dashboard-socket.service';
import { DashboardSocketGateway } from './dashboard-socket.gateway';

@Module({
  providers: [DashboardSocketGateway, DashboardSocketService],
})
export class DashboardSocketModule {}
