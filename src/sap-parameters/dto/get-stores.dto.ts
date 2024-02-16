import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class GetStoresDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'AR',
        required: true,
        description: 'Codigo de País'
    })
    Country: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: '1000',
        required: true,
        description: 'Codigo de Org Ventas'
    })
    SalesOrg: string
}