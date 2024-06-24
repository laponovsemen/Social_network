import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { BlogsRepository } from "../../features/blogs/infrastructure/blogs.repository";
import { Reflector } from "@nestjs/core";

@Injectable()
export class BasicAuthGuard implements CanActivate {
    constructor() {}

    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();
        const auth = req.headers.authorization;
        if (!auth) throw new UnauthorizedException();
        const [authType, authValue] = auth.split(" ");
        if (authType !== "Basic") throw new UnauthorizedException();
        if (authValue !== "YWRtaW46cXdlcnR5") throw new UnauthorizedException();
        return true;
    }
}
