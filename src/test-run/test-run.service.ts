import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { catchError, firstValueFrom } from 'rxjs'; 

@Injectable()
export class TestRunService {

    constructor(private readonly httpService: HttpService) { }
    
    async getSAPStores() {
        const headersRequest: AxiosRequestConfig = {
            url: `${process.env.FIORI_ENDPOINT}/sap/opu/odata/sap/ZWS_ARCUS_SRV/InformacionTiendasSet?$format=json`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${process.env.FIORI_AUTH}`,
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

    async getPreciosHana(top: string){        
       
        const { data } = await firstValueFrom(
            this.httpService.get(`${process.env.HANA_DEV}/Z_Shopper/ZPreciosWeb.xsodata/Precios?$top=${top}&$format=json`).pipe(
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
