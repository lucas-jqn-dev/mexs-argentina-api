import { IsNotEmpty, IsString } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export enum CustomerGenre {
    M = 'Masculino',
    F = 'Femenino',
    N = 'No Informa' 
 }
export class CreateCustomerDto {

    @ApiProperty({
        example: 'José',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    Nombre: string

    @ApiProperty({
        example: 'Gonzalez',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    Apellido: string

    @ApiProperty({
        example: 'jose.gonza@gmail.com',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    Email: string

    @ApiProperty({
        example: '549113221112',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    Numero: string

    @ApiProperty({
        example: '10-06-1976',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    FechaNacimiento: string

    @ApiProperty({
        enum: CustomerGenre,
        example: 'M',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    Genero: CustomerGenre

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    Calle: string

    @ApiProperty()
    @IsString()
    Piso: string

    @ApiProperty()
    @IsString()
    Departamento: string

    @ApiProperty()
    @IsString()
    Distrito: string

    @ApiProperty()
    @IsString()
    Poblacion: string

    @ApiProperty()
    @IsString()
    Region: string

    @ApiProperty()
    @IsString()
    CodigoPostal: string

    @ApiProperty()
    @IsString()
    TelFijo: string

    @ApiProperty()
    @IsString()
    TelMovil: string

    @ApiProperty()
    @IsString()
    Contacto: string

    @ApiProperty()
    @IsString()
    Latitud: string

    @ApiProperty()
    @IsString()
    Longitud: string

    @ApiProperty()
    //Revisar
    @IsString()
    IdStcdt: string

    @ApiProperty()
    @IsString()
    Stcd1: string

    @ApiProperty()
    @IsString()
    IdSegmentoCli: string

    @ApiProperty()
    @IsString()
    Stkzn: string

    @ApiProperty()
    @IsString()
    IdFityp: string

    @ApiProperty()
    @IsString()
    Vkorg: string

    @ApiProperty()
    @IsString()
    Vtweg: string

    @ApiProperty()
    @IsString()
    IdOficVta: string

    mensajexcliente: []
    percepcionesxcliente: []
}

