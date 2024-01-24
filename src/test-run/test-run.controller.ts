import { Body, Controller, Get, Query, UseGuards } from '@nestjs/common';
import { TestRunService } from './test-run.service';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { GetFormDto } from './dto/get-form.dto';

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
}
