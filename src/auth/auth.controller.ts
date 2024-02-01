import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('access_token')
  getAccessToken(@Body() signInDto: Record<string, any>) {
    return this.authService.getAccessToken(signInDto.clientId, signInDto.clientSecret, signInDto.expirationTime || "30d");
  }
}