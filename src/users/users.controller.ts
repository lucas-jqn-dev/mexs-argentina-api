import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization.guard';

@ApiTags('Clientes para consumo API')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@ApiBearerAuth()
@Controller('api-client')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Roles(['ADMIN'])
    @Get()
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({ status: 401, description: 'Unauthorized.'})
    @ApiResponse({ status: 400, description: 'Bad Request.'})
    @ApiResponse({ status: 500, description: 'Server Error.'})
    async getAll() {
        return this.usersService.getClients();
    }

    @Roles(['ADMIN'])
    @Get(':id')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({ status: 401, description: 'Unauthorized.'})
    @ApiResponse({ status: 400, description: 'Bad Request.'})
    @ApiResponse({ status: 500, description: 'Server Error.'})
    async getOne(@Param('id') clientId: string) {
        return this.usersService.getClient(clientId);
    }

    @Roles(['ADMIN'])
    @Post('create')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({ status: 401, description: 'Unauthorized.'})
    @ApiResponse({ status: 400, description: 'Bad Request.'})
    @ApiResponse({ status: 500, description: 'Server Error.'})
    async create(@Body() createCustomerDto: CreateUserDto) {
        return this.usersService.createClient(createCustomerDto);
    }

    @Roles(['ADMIN'])
    @Delete(':id')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({ status: 401, description: 'Unauthorized.'})
    @ApiResponse({ status: 400, description: 'Bad Request.'})
    @ApiResponse({ status: 500, description: 'Server Error.'})
    async deleteOne(@Param('id') clientId: string) {
        return this.usersService.deleteClient(clientId);
    }

}
