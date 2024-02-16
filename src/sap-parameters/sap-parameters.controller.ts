import { Body, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { SapParametersService } from './sap-parameters.service';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetStoresDto } from './dto/get-stores.dto';
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@ApiTags('Parámetros de SAP')
@ApiBearerAuth()
@Controller('sap-parameters')
export class SapParametersController {
  constructor(private readonly sapParametersService: SapParametersService) {}

  @Roles(['READ'])
  @Get('sales-org/:country')
  @ApiResponse({ status: 200, description: 'Return data'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.'})
  @ApiResponse({ status: 400, description: 'Bad Request.'})
  @ApiResponse({ status: 500, description: 'Server Error.'})
  @ApiParam({ name: 'country', description: 'Clave País', example: 'AR'})
  getSapSalesOrg(@Param('country') country: string) {
    return this.sapParametersService.getSapSalesOrg(country);
  }

  @Roles(['READ'])
  @Get('dist-channel')
  @ApiResponse({ status: 200, description: 'Return data'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.'})
  @ApiResponse({ status: 400, description: 'Bad Request.'})
  @ApiResponse({ status: 500, description: 'Server Error.'}) 
  getSapDistChannels() {
    return this.sapParametersService.getSapDistChannels();
  }

  @Roles(['READ'])
  @Get('stores')
  @ApiResponse({ status: 200, description: 'Return data'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.'})
  @ApiResponse({ status: 400, description: 'Bad Request.'})
  @ApiResponse({ status: 500, description: 'Server Error.'}) 
  getSapStores(@Query() GetStoresDto: GetStoresDto) {
    return this.sapParametersService.getSapStores(GetStoresDto);
  }

  @Roles(['READ'])
  @Get('sap-user/:userid')
  @ApiResponse({ status: 200, description: 'Return data'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.'})
  @ApiResponse({ status: 400, description: 'Bad Request.'})
  @ApiResponse({ status: 500, description: 'Server Error.'})
  @ApiParam({ name: 'userid', description: 'Usuario de RED Cencosud'})
  getUserSapParameters(@Param('userid') userid: string) {
    return this.sapParametersService.getUserSapParameters(userid);
  }


}
