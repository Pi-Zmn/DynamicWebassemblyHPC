import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientSocketService {
    connectedClients: string[] = []

    create(id: string) {
        this.connectedClients.push(id)
    }

    remove(id: string) {
        const index = this.connectedClients.indexOf(id, 0);
        if (index > -1) {
            this.connectedClients.splice(index, 1);
        }
    }
}
