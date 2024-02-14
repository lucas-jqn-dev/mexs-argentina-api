import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { SapParametersService } from './sap-parameters.service';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@ApiTags('Parámetros de SAP')
@ApiBearerAuth()
@Controller('sap-parameters')
export class SapParametersController {
  constructor(private readonly sapParametersService: SapParametersService) {}

  @Roles(['READ'])
  @Get('sales-org/:country')
  getSapSalesOrg(@Param('country') country: string) {
    return this.sapParametersService.getSapSalesOrg(country);
  }

  @Roles(['READ'])
  @Get('sap-user/:sapuser')
  @ApiResponse({ status: 200, description: 'Return data'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.'})
  @ApiResponse({ status: 500, description: 'Server Error.'})
  getUserSapParameters(@Param('sapuser') sapuser: string) {
    return this.sapParametersService.getUserSapParameters(sapuser);
  }


}
