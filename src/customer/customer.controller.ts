import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@UseGuards(AuthenticationGuard, AuthorizationGuard)
@ApiTags('Clientes SAP')
@ApiBearerAuth()
@Controller('sap-customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Roles(['WRITE'])
  @Post('create')
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.'})
  @ApiResponse({ status: 500, description: 'Server Error.'})
  @ApiBody({
    type: CreateCustomerDto,
    description: 'Json structure for user object',
 })
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Roles(['READ'])
  @Get()
  findAll() {
    return this.customerService.findAll();
  }
  
  @Roles(['READ'])
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Returns record data.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.'})
  @ApiResponse({ status: 500, description: 'Server Error.'})
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  @Roles(['WRITE'])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  // @Roles(['WRITE'])
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.customerService.remove(+id);
  // }
}
