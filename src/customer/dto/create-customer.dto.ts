import { IsNotEmpty, IsString } from "class-validator"

export class CreateCustomerDto {
    @IsString()
    @IsNotEmpty()
    Nombre: string

    @IsString()
    @IsNotEmpty()
    Apellido: string

    @IsString()
    @IsNotEmpty()
    Email: string

    @IsString()
    @IsNotEmpty()
    Numero: string

    @IsString()
    @IsNotEmpty()
    FechaNacimiento: string

    @IsString()
    @IsNotEmpty()
    Genero: string
    
    @IsString()
    @IsNotEmpty()
    Calle: string

    @IsString()
    Piso: string

    @IsString()
    Departamento: string

    @IsString()
    Distrito: string

    @IsString()
    Poblacion: string

    @IsString()
    Region: string

    @IsString()
    CodigoPostal: string

    @IsString()
    TelFijo: string

    @IsString()
    TelMovil: string

    @IsString()
    Contacto: string

    @IsString()
    Latitud: string

    @IsString()
    Longitud: string

    @IsString()

    //Revisar
    IdStcdt: string

    @IsString()
    Stcd1: string

    @IsString()
    IdSegmentoCli: string

    @IsString()
    Stkzn: string

    @IsString()
    IdFityp: string

    @IsString()
    Vkorg: string

    @IsString()
    Vtweg: string

    @IsString()
    IdOficVta: string
    
    mensajexcliente: []
    percepcionesxcliente: []
}

