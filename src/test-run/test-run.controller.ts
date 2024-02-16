import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { TestRunService } from './test-run.service';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { GetFormDto } from './dto/get-form.dto';
import { StockOnlineDto } from './dto/stock-online.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@UseGuards(AuthenticationGuard, AuthorizationGuard)
@ApiTags('APIS de Prueba (PoC)')
@ApiBearerAuth()
@Controller('api-poc')
export class TestRunController {

    constructor(private testService: TestRunService) {}

    @Roles(['READ'])
    @Get('SAPStores')
    getDataBySAPCode(){ 
        return this.testService.getSAPStores();
    }

    @Roles(['READ'])
    @Get('OdataHanaPrecios/Top?')
    getClientByFcode(@Query('Top') Top: string){  
        return this.testService.getPreciosHana(Top);
    }
 
    @Roles(['READ'])
    @Get('PI/PortalProveedoresCO/ConsultaFormulario')
    execConsultaFormulario(@Body() GetFormDto: GetFormDto){  
        return this.testService.getFormPI(GetFormDto);
    }

    @Roles(['WRITE'])
    @Post('PI/StockOnline')
    execStockOnlineNCR(@Body() StockOnlineDto: StockOnlineDto){     
        return this.testService.sendStockOnline(StockOnlineDto);
    }
}
