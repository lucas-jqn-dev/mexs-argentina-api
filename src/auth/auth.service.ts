
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) { }

  async getAccessToken(signInDto: SignInDto): Promise<any> {

    const user = await this.usersService.getClient(signInDto.clientId);
    if (user[0].clientSecret != signInDto.clientSecret && !user[0].roles) {
      throw new UnauthorizedException();
    }

    const payload = {
      client_id: signInDto.clientId,
      client_secret: signInDto.clientSecret,
      roles: user[0].roles
    };

    const access_token = await this.jwtService.signAsync(payload, { secret: signInDto.clientSecret, expiresIn: signInDto.expirationTime });
    const decoded = this.jwtService.decode(access_token);

    return {
      valid_from: new Date(decoded.iat * 1000).toLocaleString(),
      valid_to: new Date(decoded.exp * 1000).toLocaleString(),
      access_token: access_token,
    };

  }
}