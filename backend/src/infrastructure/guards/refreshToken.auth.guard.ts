import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class RefreshTokenAuthGuard implements CanActivate {
    constructor(protected jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
        try {
            const req = context.switchToHttp().getRequest();
            const refreshTokenInCookie = req.cookies.refreshToken;
            console.log(refreshTokenInCookie);
            if (!refreshTokenInCookie) {
                console.log("refreshTokenInCookie is present");
                throw new BadRequestException();
            }

            const result = this.jwtService.verify(refreshTokenInCookie, {
                secret: jwtConstants.secretForRefresh,
            });
            if (!result) {
                console.log("refreshTokenInCookie is not verified");
                throw new NotFoundException();
            }
            req.refreshToken = refreshTokenInCookie;
            return true;
        } catch (e) {
            console.log(e);
            console.log("refreshTokenInCookie is not present");
            throw new UnauthorizedException();
        }
    }
}
