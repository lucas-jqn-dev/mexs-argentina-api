import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested, isNotEmpty } from "class-validator"

export class StockOnlineItem {
    @IsString()
    @IsNotEmpty()
    IdEnvio: string

    @IsString()
    @IsNotEmpty()
    IdTrx: string

    @IsString()
    @IsNotEmpty()
    SubTrx: string

    @IsString()
    @IsNotEmpty()
    TipoDoc: string

    @IsString()
    @IsNotEmpty()
    Werks: string

    @IsNumber()
    @IsNotEmpty()
    FecEjecucion: number

    @IsString()
    @IsNotEmpty()
    NroCaja: string

    @IsString()
    @IsNotEmpty()
    NroTrx: string

    @IsString()
    @IsNotEmpty()
    Ean11: string

    @IsNumber()
    @IsNotEmpty()
    Kwmeng: number

    @IsString()
    @IsNotEmpty()
    TipoOpe: string

    @IsNumber()
    @IsNotEmpty()
    Netpr: number

    @IsNumber()
    @IsNotEmpty()
    Fkdat: number

    @IsString()
    @IsNotEmpty()
    Xblnr: string

    @IsString() 
    Stcd1: string
}

export class StockOnlineItemArray {
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested()
    item: StockOnlineItem[]
}

export class StockOnlineDto {
    @ValidateNested()
    IDataIn: StockOnlineItemArray
}