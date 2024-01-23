
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,  private jwtService: JwtService) {}

  async getAccessToken(client_id: string, client_secret: string): Promise<any> {
    
    const user = await this.usersService.getClient(client_id);    
    if (user[0].clientSecret != client_secret) { 
      throw new UnauthorizedException();
    }

    const payload = { client_id: client_id, client_secret: client_secret };
    return {
      access_token: await this.jwtService.signAsync(payload, {secret: client_secret , expiresIn: '60d'}),
    };
     
  }
}