
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) { }

  async getAccessToken(client_id: string, client_secret: string, expirationTime: string): Promise<any> {

    const user = await this.usersService.getClient(client_id);
    if (user[0].clientSecret != client_secret && !user[0].roles) {
      throw new UnauthorizedException();
    }

    const payload = {
      client_id: client_id,
      client_secret: client_secret,
      roles: user[0].roles
    };

    const access_token = await this.jwtService.signAsync(payload, { secret: client_secret, expiresIn: expirationTime });
    const decoded = this.jwtService.decode(access_token);

    return {
      valid_from: new Date(decoded.iat * 1000).toLocaleString(),
      valid_to: new Date(decoded.exp * 1000).toLocaleString(),
      access_token: access_token,
    };

  }
}