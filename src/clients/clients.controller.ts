import { Controller, Get, Param, Query } from '@nestjs/common';
import { ClientsService } from './clients.service'; 

@Controller('clients')
export class ClientsController {

    constructor(private clientSetvice: ClientsService) {}

    //@Get(':idSap')
   //getClientData(@Param('idSap') idSap: string){
   //     return this.clientSetvice.getClientBySap(idSap);
   // }
    @Get('findBySAPCode/Code?')
    getDataBySAPCode(@Query('SAPCode') SAPCode: string){ 
        return this.clientSetvice.getClientBySap(SAPCode);
    }

    @Get('findByFiscalCode/Code?')
    getClientByFcode(@Query('FCode') FCode: string){  
        return this.clientSetvice.getClientByFcode(FCode);
    }


}
