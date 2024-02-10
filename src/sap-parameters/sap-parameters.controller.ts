import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { SapParametersService } from './sap-parameters.service';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { Roles } from 'src/decorators/roles.decorator';

@UseGuards(AuthenticationGuard, AuthorizationGuard)
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
  getUserSapParameters(@Param('sapuser') sapuser: string) {
    return this.sapParametersService.getUserSapParameters(sapuser);
  }


}
