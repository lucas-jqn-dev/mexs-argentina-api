import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class SearchSapCustomer {
    @ApiProperty({
        example: '1663458', 
    })
    @IsString()
    @IsNotEmpty()
    SapId: string

    @ApiProperty({
        example: 'LUCAS', 
    })
    @IsString()
    @IsNotEmpty()
    FirstName: string

    @ApiProperty({
        example: 'FLORIO', 
    })
    @IsString()
    @IsNotEmpty()
    LastName: string

    @ApiProperty({
        example: '36988023', 
    })
    @IsString()
    @IsNotEmpty()
    FiscalNumber: string

    @ApiProperty({
        example: '1000', 
    })
    @IsString()
    @IsNotEmpty()
    SalesOrg: string

    @ApiProperty({
        example: '10', 
    })
    @IsString()
    @IsNotEmpty()
    DistChannel: string
}
