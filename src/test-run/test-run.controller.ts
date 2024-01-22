import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { TestRunService } from './test-run.service';
import { AuthenticationGuard } from 'src/guards/authentication.guard';

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
}
