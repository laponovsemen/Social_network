import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";
import { jwtConstants } from "../../features/auth/constants";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()],
        );
        if (isPublic) {
            // 💡 See this condition
            return true;
        }
        //console.log(this.jwtService, " jwtService");
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        //console.log(request, "request");
        //console.log(token, " token");

        if (!token) {
            console.log(" token not found");
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: jwtConstants.secretForAccess,
            });
            request.accessToken = token;
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request["user"] = payload;
        } catch {
            console.log(" token is not correct");
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(" ") ?? [];
        return type === "Bearer" ? token : undefined;
    }
}
