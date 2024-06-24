import { INestApplication } from "@nestjs/common";

export const applyCORS = (app: INestApplication) => {
    app.enableCors();
};
