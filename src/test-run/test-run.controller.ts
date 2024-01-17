import { Controller, Get, Query } from '@nestjs/common';
import { TestRunService } from './test-run.service';

@Controller('test-run')
export class TestRunController {

    constructor(private testService: TestRunService) {}

    @Get('SAPStores')
    getDataBySAPCode(){ 
        return this.testService.getSAPStores();
    }

    @Get('OdataHanaPrecios/Top?')
    getClientByFcode(@Query('Top') Top: string){  
        return this.testService.getPreciosHana(Top);
    }
}
