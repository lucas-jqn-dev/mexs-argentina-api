import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
    @ApiProperty({
        example: 'MI_CLIENT_NAME',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    clientId: string

    @ApiProperty({
        example: 'MI-CLIENT-SECRET',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    clientSecret: string

    @ApiProperty({
        example: '30d',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    expirationTime: string
}