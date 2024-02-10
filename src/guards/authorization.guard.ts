import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"; 
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "src/decorators/roles.decorator";

@Injectable()
export class AuthorizationGuard implements CanActivate {

    constructor(private reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        //Get Roles from client excecutioner
        const clientRoles = request.user.roles; 
        if (!clientRoles) {
            throw new UnauthorizedException();
        }

        //Get Roles set for the request
        const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [context.getHandler(), context.getClass()]);

        //Validates roles
        const commonRole = requiredRoles.filter(rr => clientRoles.includes(rr));

        if (!commonRole.length) {
            //No Roles Match
            return false;
        } else {
            //Roles Match
            return true;
        }
    }
    
}