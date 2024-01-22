import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
    private readonly users = [
        {
            userId: 1,
            client_id: 'MEXS_ARG', 
            client_secret: 'dwucLJZZMEk1REgsFtFhOfvpoQKUS8O6'
        },
        {
            userId: 2,
            client_id: 'MI_LOCAL', 
            client_secret: 'iMqR19j3OlVFUht7GchuBMXtWTo7v4xa'
        },
    ];

    async findOne(clientId: string): Promise<User | undefined> {
        return this.users.find(user => user.client_id === clientId);
    }
}