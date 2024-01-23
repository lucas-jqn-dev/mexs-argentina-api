import { Injectable } from '@nestjs/common';

import { User } from './interfaces/users.interface'
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { randomUUID } from "crypto";

// This should be a real class/interface representing a user entity
@Injectable()
export class UsersService {

    constructor(@InjectModel("Users") private readonly usersModel: Model<User>){}

   async getClients(): Promise<User[]> {
        const users = await this.usersModel.find()
        return users;
    }

    async getClient(clientId: string): Promise<any> {
        const user = await this.usersModel.find({ clientId: clientId }).exec();
        return user;
    }

    async createClient(client: CreateUserDto) : Promise<User> {

        const dataUser = {
            clientId: client.clientId,
            clientSecret: randomUUID()
        }
        
        const userCreated = new this.usersModel(dataUser);
        return await userCreated.save(); 
    }
    
    async deleteClient(clientId: string): Promise<User> {
        const deletedUser = await this.usersModel.findOneAndDelete({ clientId: clientId });
        return deletedUser;
    }

}