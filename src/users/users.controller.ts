import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Clientes API')
@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Get()
    async getAll() {
        return this.usersService.getClients();
    }

    @Get(':id')
    async getOne(@Param('id') clientId: string) {
        return this.usersService.getClient(clientId);
    }

    @Post('create')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({ status: 401, description: 'Unauthorized.'})
    @ApiResponse({ status: 500, description: 'Server Error.'})
    async create(@Body() createCustomerDto: CreateUserDto) {
        return this.usersService.createClient(createCustomerDto);
    }

    @Delete(':id')
    async deleteOne(@Param('id') clientId: string) {
        return this.usersService.deleteClient(clientId);
    }

}
