import { Injectable } from '@nestjs/common';
import { ClientInfo, WorkerClient } from './entity/workerclient.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class ClientSocketService {
    constructor(private eventEmitter: EventEmitter2) {}

    connectedWorkerClients: Map<string, WorkerClient> = new Map<string, WorkerClient>;

    create(id: string) {
        const newClient: WorkerClient = {
            id,
            info: undefined
        }
        this.connectedWorkerClients.set(id, newClient)
    }

    remove(id: string) {
        this.connectedWorkerClients.delete(id)
        this.publishClientUpdate()
    }

    setClientInfo(id:string, clientInfo: ClientInfo | undefined) {
        const clientToUpdate: WorkerClient = this.connectedWorkerClients.get(id)
        clientToUpdate.info = clientInfo
        this.connectedWorkerClients.set(id, clientToUpdate)
        this.publishClientUpdate()
    }

    publishClientUpdate() {
        // Publish 'client-update' Event to notify Dashboard Socket
        this.eventEmitter.emit('workerclient-update', [... this.connectedWorkerClients.values()])
    }
}
