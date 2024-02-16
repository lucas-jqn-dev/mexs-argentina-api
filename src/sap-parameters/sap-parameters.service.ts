import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { catchError, firstValueFrom, lastValueFrom } from 'rxjs';
import { GetStoresDto } from './dto/get-stores.dto';

@Injectable()
export class SapParametersService {

    constructor(private readonly httpService: HttpService) { }

    async getSapSalesOrg(country: string) {

        const headersRequest: AxiosRequestConfig = {
            url: `${process.env.FIORI_ENDPOINT}ZWS_APIMEXS_AR_SRV/salesOrgSet?$filter= Country eq '${country}'`,
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

    async getSapDistChannels(){
        const headersRequest: AxiosRequestConfig = {
            url: `${process.env.FIORI_ENDPOINT}ZWS_APIMEXS_AR_SRV/distChannelSet`,
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

    async getSapStores(GetStoresDto: GetStoresDto){

        const headersRequest: AxiosRequestConfig = {
            url: `${process.env.FIORI_ENDPOINT}ZWS_APIMEXS_AR_SRV/storesSet?$filter= country eq '${GetStoresDto.Country}' and salesOrg eq '${GetStoresDto.SalesOrg}'`,
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

        const expand = `&$expand=userParameters,sapRoles`

        const headersRequest: AxiosRequestConfig = {
            url: `${process.env.FIORI_ENDPOINT}ZWS_APIMEXS_AR_SRV/userInformationSet?$filter= SapUser eq '${sapuser}'${expand}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${process.env.FIORI_AUTH}`,
            }
        };

        const { data } = await firstValueFrom(
            this.httpService.get(headersRequest.url, headersRequest).pipe(
                catchError((error) => {

                    if (error.response.data && error.response.data.error) {
                        throw new BadRequestException(error.response.data.error.message.value);
                    } else {
                        throw new BadRequestException(`An error happened. Msg: ${JSON.stringify(
                            error?.response?.data,
                        )}`);
                    }

                }),
            ),
        );

        if (data.d) {
            delete data.d.__metadata;

            if (data.d.results && data.d.results.length) {
                data.d.results.forEach(function (item, index) {
                    try {
                        delete data.d.results[index].__metadata;

                        if (data.d.results[index].sapRoles.results && data.d.results[index].sapRoles.results.length) {
                            data.d.results[index].sapRoles.results.forEach(function (item, i1) {
                                delete data.d.results[index].sapRoles.results[i1].__metadata;
                            });
                        }

                        if (data.d.results[index].userParameters.results && data.d.results[index].userParameters.results.length) {
                            data.d.results[index].userParameters.results.forEach(function (item, i2) {
                                delete data.d.results[index].userParameters.results[i2].__metadata;
                            });
                        }
                    } catch (e) { }
                });
            }
        }


        return data.d

    }
}
