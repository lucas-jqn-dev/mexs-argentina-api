import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SearchSapCustomer } from './entities/customer.entity';

@UseGuards(AuthenticationGuard, AuthorizationGuard)
@ApiTags('Clientes SAP')
@ApiBearerAuth()
@Controller('sap-customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }

  @Roles(['READ'])
  @Get('fiscal-number/search?')
  @ApiResponse({ status: 200, description: 'Returns record data.' , type: SearchSapCustomer, isArray: true})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Server Error.' })
  findByFiscalNumber(
    @Query('salesOrg') salesOrg: string,
    @Query('fiscalNumber') fiscalNumber: string,
  ) {
    return this.customerService.fetchByFiscal(salesOrg, fiscalNumber);
  }

  @Roles(['READ'])
  @Get('sap-id/search?')
  @ApiResponse({ status: 200, description: 'Returns record data.' , type: SearchSapCustomer, isArray: true})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Server Error.' }) 
  findBySapId(
    @Query('salesOrg') salesOrg: string,
    @Query('sapId') sapId: string,
  ) {
    return this.customerService.fetchBySapId(salesOrg, sapId);
  }

  @Roles(['READ'])
  @Get('first-name/search?')
  @ApiResponse({ status: 200, description: 'Returns record data.' , type: SearchSapCustomer, isArray: true})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Server Error.' }) 
  findByFirstName(
    @Query('salesOrg') salesOrg: string,
    @Query('firstName') firstName: string,
  ) {
    return this.customerService.fetchByName(salesOrg, firstName);
  }

  @Roles(['READ'])
  @Get('last-name/search?')
  @ApiResponse({ status: 200, description: 'Returns record data.' , type: SearchSapCustomer, isArray: true})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Server Error.' })
  findByLastName(
    @Query('salesOrg') salesOrg: string,
    @Query('lastName') lastName: string,
  ) {
    return this.customerService.fetchByLastName(salesOrg, lastName);
  }

  @Roles(['WRITE'])
  @Post('create')
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Server Error.' })
  @ApiBody({
    type: CreateCustomerDto,
    description: 'Json structure for user object',
  })
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }


  @Roles(['READ'])
  @Get(':sapid')
  @ApiResponse({ status: 200, description: 'Returns record data.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Server Error.' })
  findOne(@Param('sapid') sapid: string) {
    return this.customerService.findBySapId(sapid);
  }

  @Roles(['WRITE'])
  @Patch(':sapid')
  update(@Param('sapid') sapid: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(sapid, updateCustomerDto);
  }

}
