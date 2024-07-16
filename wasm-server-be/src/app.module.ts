import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobModule } from './job/job.module';
import { Job } from './job/entities/job.entity';
import { ClientSocketModule } from './client-socket/client-socket.module';
import { DashboardSocketModule } from './dashboard-socket/dashboard-socket.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [JobModule, ClientSocketModule, DashboardSocketModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'myuser',
      password: 'secret',
      database: 'mydatabase',
      entities: [Job],
      synchronize: true,
    }),
    EventEmitterModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'wasm'),
      serveRoot: '/wasm/'
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
