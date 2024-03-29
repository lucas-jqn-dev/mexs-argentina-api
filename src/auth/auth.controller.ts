import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/sign-in.dto';

@ApiTags('Autenticacion Clientes API')
@Controller('api-client/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('access_token')
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.'})
  @ApiResponse({ status: 400, description: 'Bad Request.'})
  @ApiResponse({ status: 500, description: 'Server Error.'}) 
  getAccessToken(@Body() signInDto: SignInDto) {
    return this.authService.getAccessToken(signInDto);
  }
}