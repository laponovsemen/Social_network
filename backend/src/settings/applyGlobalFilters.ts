import { INestApplication } from "@nestjs/common";
import { HttpExceptionFilter } from "../infrastructure/exception.filters/exception.filter";

export const applyGlobalFilters = (app: INestApplication) => {
    app.useGlobalFilters(new HttpExceptionFilter());
};
