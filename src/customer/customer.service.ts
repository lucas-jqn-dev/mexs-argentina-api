import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { AxiosRequestConfig } from 'axios';
import { catchError, firstValueFrom, lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
@Injectable()
export class CustomerService {

  constructor(private readonly httpService: HttpService) { }

  async create(createCustomerDto: CreateCustomerDto) {

    let responseApi = {
      Created: false,
      SAPClientId: '',
      FiscalNumber: '',
      Message: ''
    }

    const headersRequestToken: AxiosRequestConfig = {
      url: `${process.env.FIORI_ENDPOINT}/sap/opu/odata/sap/ZWS_DATCUSTCROSS_MEXSAR_SRV/tiendaNCRSet(StoreId='E103')`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${process.env.FIORI_AUTH}`,
        'x-csrf-token': 'Fetch'
      }
    };

    // Logica para obtener el CSRF Token SAP y Cookie SAP
    const res = await firstValueFrom(
      this.httpService.get(headersRequestToken.url, headersRequestToken).pipe(
        catchError((error) => {
          throw new BadRequestException(`An error happened. Msg: ${JSON.stringify(
            error?.response?.data,
          )}`);
        }),
      ),
    );

    const CSRFToken = res.headers['x-csrf-token'];
    const CookieSAP = res.headers['set-cookie'][1];

    const headersRequest: AxiosRequestConfig = {
      url: `${process.env.FIORI_ENDPOINT}/sap/opu/odata/sap/ZWS_CLIENTE_SRV/clienteSet`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${process.env.FIORI_AUTH}`,
        'X-CSRF-Token': CSRFToken,
        'Cookie': CookieSAP
      }
    };

    const { data } = await lastValueFrom(
      this.httpService.post(headersRequest.url, createCustomerDto, headersRequest).pipe(
        catchError((error) => {
          throw new BadRequestException(`An error happened. Msg: ${JSON.stringify(
            error?.response?.data,
          )}`);
        }),
      ),
    );

    if (data.d.Numcliente) {
      responseApi.Created = true;
      responseApi.SAPClientId = data.d.Numcliente;
      responseApi.FiscalNumber = data.d.Stcd1;
      responseApi.Message = `Cliente ${createCustomerDto.Nombre} ${createCustomerDto.Apellido} creado con SAP ID ${responseApi.SAPClientId}`;
    } else {
      responseApi.Created = false;
      responseApi.Message = `No se ha creado el cliente ${createCustomerDto.Nombre} ${createCustomerDto.Apellido}`
    }

    return responseApi;
  }

  findAll() {
    return `This action returns all customer`;
  }

  async findOne(id: string) {

    const query = `(Numcliente='${id}',Vkorg='1000',Vtweg='10',Bukrs='A001')`
    const expand = `?$expand=anticiposxcliente,creditoxcliente,direccionesxcliente,contactosxcliente,mensajexcliente,percepcionesxcliente,mediopagoxcliente`

    const headersRequest: AxiosRequestConfig = {
      url: `${process.env.FIORI_ENDPOINT}/sap/opu/odata/sap/ZWS_CLIENTE_SRV/clienteSet${query}${expand}`,
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

    delete data.d.__metadata;

    if (data.d.mensajexcliente && data.d.mensajexcliente.results) {
      data.d.mensajexcliente.results.forEach(function (item, index) {
        try {
          delete data.d.mensajexcliente.results[index].__metadata;
        } catch (e) { }
      });
    }

    if (data.d.creditoxcliente && data.d.creditoxcliente.results) {
      data.d.creditoxcliente.results.forEach(function (item, index) {
        try {
          delete data.d.creditoxcliente.results[index].__metadata;
        } catch (e) { }
      });
    }

    if (data.d.direccionesxcliente && data.d.direccionesxcliente.results) {
      data.d.direccionesxcliente.results.forEach(function (item, index) {
        try {
          delete data.d.direccionesxcliente.results[index].__metadata;
        } catch (e) { }
      });
    }

    if (data.d.percepcionesxcliente && data.d.percepcionesxcliente.results) {
      data.d.percepcionesxcliente.results.forEach(function (item, index) {
        try {
          delete data.d.percepcionesxcliente.results[index].__metadata;
        } catch (e) { }
      });
    }

    if (data.d.contactosxcliente && data.d.contactosxcliente.results) {
      data.d.contactosxcliente.results.forEach(function (item, index) {
        try {
          delete data.d.contactosxcliente.results[index].__metadata;
        } catch (e) { }
      });
    }

    if (data.d.mediopagoxcliente && data.d.mediopagoxcliente.results) {
      data.d.mediopagoxcliente.results.forEach(function (item, index) {
        try {
          delete data.d.mediopagoxcliente.results[index].__metadata;
        } catch (e) { }
      });
    }

    if (data.d.anticiposxcliente && data.d.anticiposxcliente.results) {
      data.d.anticiposxcliente.results.forEach(function (item, index) {
        try {
          delete data.d.anticiposxcliente.results[index].__metadata;
        } catch (e) { }
      });
    }

    return data.d

  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
