import {
    BadRequestException,
    INestApplication,
    ValidationPipe,
} from "@nestjs/common";
import cookieParser from "cookie-parser";
import { HttpExceptionFilter } from "../infrastructure/exception.filters/exception.filter";
import { useContainer } from "class-validator";
import { AppModule } from "../app.module";
import { applyCORS } from "./applyCORS";
import { applyCookie } from "./applyCookie";
import { applyGlobalPipes } from "./applyGlobalPipes";
import { applyGlobalFilters } from "./applyGlobalFilters";
import { applyValidationConstraints } from "./applyValidationConstraints";

export const applySettings = (app: INestApplication) => {
    applyCORS(app);
    applyCookie(app);
    applyGlobalPipes(app);
    applyGlobalFilters(app);
    applyValidationConstraints(app);
};
