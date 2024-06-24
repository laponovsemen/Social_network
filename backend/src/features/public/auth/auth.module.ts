import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./api/auth.controller";
import { AuthService } from "./application/auth.service";
import { jwtConstants } from "../../../constants";
import { AuthGuard } from "../../infrastructure/guards/accessToken.auth.guard";
import { RefreshTokenAuthGuard } from "../../infrastructure/guards/refreshToken.auth.guard";
import { BasicAuthGuard } from "../../infrastructure/guards/basic.auth.guard";

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secretForAccess,
            signOptions: { expiresIn: "60s" },
        }),
    ],
    providers: [
        AuthService,
        JwtService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RefreshTokenAuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: BasicAuthGuard,
        },
    ],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
