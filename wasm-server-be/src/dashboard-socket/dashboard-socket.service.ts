import { Injectable, Logger } from '@nestjs/common';
import { WorkerClient } from 'src/client-socket/entity/workerclient.entity';

@Injectable()
export class DashboardSocketService {
    /**
     * Unused Code
     * 
    connectedDashboardClients: string[] = []

    create(id:string) {
        this.connectedDashboardClients.push(id)
    }

    remove(id: string) {
        const index = this.connectedDashboardClients.indexOf(id, 0)
        if (index > -1) {
            this.connectedDashboardClients.splice(index, 1)
        }
    }
    */
}
