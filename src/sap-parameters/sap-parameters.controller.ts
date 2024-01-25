import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { SapParametersService } from './sap-parameters.service';
import { AuthenticationGuard } from 'src/guards/authentication.guard';

@UseGuards(AuthenticationGuard)
@Controller('sap-parameters')
export class SapParametersController {
  constructor(private readonly sapParametersService: SapParametersService) {}

  @Get('sales-org/:country')
  getSapSalesOrg(@Param('country') country: string) {
    return this.sapParametersService.getSapSalesOrg(country);
  }

  @Get('sap-user/:sapuser')
  getUserSapParameters(@Param('sapuser') sapuser: string) {
    return this.sapParametersService.getUserSapParameters(sapuser);
  }


}
