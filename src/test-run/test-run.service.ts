import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { GetFormDto } from './dto/get-form.dto';

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
                    throw new BadRequestException(`An error happened. Msg: ${JSON.stringify(
                        error?.response?.data,
                    )}`);
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

    async getPreciosHana(top: string) {

        const { data } = await firstValueFrom(
            this.httpService.get(`${process.env.HANA_ENDPOINT}/Z_Shopper/ZPreciosWeb.xsodata/Precios?$top=${top}&$format=json`).pipe(
                catchError((error) => {
                    console.log(error)
                    throw new BadRequestException(`An error happened. Msg: ${JSON.stringify(
                        error?.response?.data,
                    )}`);
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

    async getFormPI(GetFormDto: GetFormDto) {

        const headersRequest: AxiosRequestConfig = {
            url: `${process.env.PI_ENDPOINT}/PortalProveedoresCO/ConsultaFormulario`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${process.env.PI_AUTH}`,
            },
            data: GetFormDto
        };

        const { data } = await firstValueFrom(
            this.httpService.get(headersRequest.url, headersRequest).pipe(
                catchError((error) => {
                    console.log(error)
                    throw new BadRequestException(`An error happened. Msg: ${JSON.stringify(
                        error?.response?.data,
                    )}`);
                }),
            ),
        );

        return data;
    }


}
