import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"; 
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const access_token = this.extractTokenFromHeader(request); 
        if (!access_token) {
            throw new UnauthorizedException();
        }

        try { 
            const payload = await this.jwtService.decode(access_token);
            const success = await this.jwtService.verifyAsync(access_token, {secret: payload.client_secret});

            request['user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}