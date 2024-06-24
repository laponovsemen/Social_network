import { INestApplication } from "@nestjs/common";
import cookieParser from "cookie-parser";

export const applyCookie = (app: INestApplication) => {
    app.use(cookieParser());
};
