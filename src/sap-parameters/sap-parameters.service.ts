import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { catchError, firstValueFrom, lastValueFrom } from 'rxjs';

@Injectable()
export class SapParametersService {

    constructor(private readonly httpService: HttpService) { }

    async getSapSalesOrg(country: string) {

        const headersRequest: AxiosRequestConfig = {
            url: `${process.env.FIORI_ENDPOINT}/sap/opu/odata/sap/ZWS_APIMEXS_AR_SRV/salesOrgSet?$filter= Country eq '${country}'`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${process.env.FIORI_AUTH}`,
            }
        };

        const { data } = await firstValueFrom(
            this.httpService.get(headersRequest.url, headersRequest).pipe(
                catchError((error) => {
                    throw new BadRequestException(`An error happened. Msg: ${JSON.stringify(
                        error?.response?.data,
                    )}`);
                }),
            ),
        );
 
        if (data.d) {
            delete data.d.__metadata;

            if (data.d.results && data.d.results.length) {
                data.d.results.forEach(function (item, index) {
                    try {
                        delete data.d.results[index].__metadata;
                    } catch (e) { }
                });
            }
        }

        return data.d

    }

    async getUserSapParameters(sapuser: string) {

        const headersRequest: AxiosRequestConfig = {
            url: `${process.env.FIORI_ENDPOINT}/sap/opu/odata/sap/ZWS_APIMEXS_AR_SRV/userParametersSet?$filter= SapUser eq '${sapuser}'`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${process.env.FIORI_AUTH}`,
            }
        };

        const { data } = await firstValueFrom(
            this.httpService.get(headersRequest.url, headersRequest).pipe(
                catchError((error) => {
                    throw new BadRequestException(`An error happened. Msg: ${JSON.stringify(
                        error?.response?.data,
                    )}`);
                }),
            ),
        );
        
        if (data.d) {
            delete data.d.__metadata;

            if (data.d.results && data.d.results.length) {
                data.d.results.forEach(function (item, index) {
                    try {
                        delete data.d.results[index].__metadata;
                    } catch (e) { }
                });
            }
        }


        return data.d

    }
}
