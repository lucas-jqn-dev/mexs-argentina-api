import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    clientId: string

    @IsArray()
    roles: string[]
}