import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { TestRunService } from './test-run.service';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { GetFormDto } from './dto/get-form.dto';
import { StockOnlineDto } from './dto/stock-online.dto';

@Controller('test-run')
export class TestRunController {

    constructor(private testService: TestRunService) {}

    @UseGuards(AuthenticationGuard)
    @Get('SAPStores')
    getDataBySAPCode(){ 
        return this.testService.getSAPStores();
    }

    @UseGuards(AuthenticationGuard)
    @Get('OdataHanaPrecios/Top?')
    getClientByFcode(@Query('Top') Top: string){  
        return this.testService.getPreciosHana(Top);
    }

    @UseGuards(AuthenticationGuard)
    @Get('PI/PortalProveedoresCO/ConsultaFormulario')
    execConsultaFormulario(@Body() GetFormDto: GetFormDto){  
        return this.testService.getFormPI(GetFormDto);
    }

    @UseGuards(AuthenticationGuard)
    @Post('PI/StockOnline')
    execStockOnlineNCR(@Body() StockOnlineDto: StockOnlineDto){     
        return this.testService.sendStockOnline(StockOnlineDto);
    }
}
