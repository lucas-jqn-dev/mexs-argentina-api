import { Injectable } from '@nestjs/common';
import { Client } from './clients.entity';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class ClientsService {

    constructor(private readonly httpService: HttpService) { }

    clients = [{
        idSap: `123ABC`,
        firstName: `LUCAS JOAQUIN`,
        lastName: `FLORIO`,
        fiscalId: `36988023`
    },
    {
        idSap: `456ABC`,
        firstName: `DANIELA`,
        lastName: `PATINO`,
        fiscalId: `267783839`
    }]

    async getClientBySap(idSap: string) {

        const headersRequest: AxiosRequestConfig = {
            url: 'https://easyartest.cencosud.com/sap/opu/odata/sap/ZWS_ARCUS_SRV/InformacionTiendasSet?$format=json',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic QVJDVVNfQVI6SW5pY2lhbDA5Kg==`,
            }
        };
        const { data } = await firstValueFrom(
            this.httpService.get(headersRequest.url, headersRequest).pipe(
                catchError((error) => {
                    throw `An error happened. Msg: ${JSON.stringify(
                        error?.response?.data,
                    )}`;
                }),
            ),
        );

        data.d.results.forEach(function (item, index) {
            try {
                delete data.d.results[index].__metadata;
            } catch (e) { }
        });
        return data.d.results

    }

    async getClientByFcode(fCode: string) {

        const { data } = await firstValueFrom(
            this.httpService.get('http://hd0-db:8000/Z_Shopper/ZPreciosWeb.xsodata/Precios?$top=10000&$format=json').pipe(
                catchError((error) => {
                    console.log(error)
                    throw `An error happened. Msg: ${JSON.stringify(
                        error?.response?.data,
                    )}`;
                }),
            ),
        );

        data.d.results.forEach(function (item, index) {
            try {
                delete data.d.results[index].__metadata;
            } catch (e) { }
        });
        return data.d.results
    }


}
