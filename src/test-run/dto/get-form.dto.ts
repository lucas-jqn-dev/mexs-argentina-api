import { IsNotEmpty, IsString } from "class-validator"

export class GetFormDto {
    @IsString()
    @IsNotEmpty()
    TipoDocumento: string

    @IsString()
    @IsNotEmpty()
    Documento: string
}