import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { AxiosRequestConfig } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
@Injectable()
export class CustomerService {

  constructor(private readonly httpService: HttpService) { }

  create(createCustomerDto: CreateCustomerDto) {
    return 'This action adds a new customer';
  }

  findAll() {
    return `This action returns all customer`;
  }

  async findOne(id: string) {
    // return `This action returns a #${id} customer`;

    const expand = `?$expand=anticiposxcliente,creditoxcliente,direccionesxcliente,contactosxcliente,mensajexcliente,percepcionesxcliente,mediopagoxcliente`

    const headersRequest: AxiosRequestConfig = {
      url: `${process.env.FIORI_QAS}/sap/opu/odata/sap/ZWS_CLIENTE_SRV/clienteSet(Numcliente='${id}',Vkorg='1000',Vtweg='10',Bukrs='A001')${expand}`,
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
