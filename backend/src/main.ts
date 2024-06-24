import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import ngrok from "ngrok";
import { applySettings } from "./settings/applySettings";

const axios = require("axios");

/**
 * deprecated
 * to delete or replace in future
 */
async function connectToNgrok() {
    try {
        //ngrok config add-authtoken 2Nmf1p0bshnqknYHXgYe5mYGLub_4g4TnaAGFDp5YJJjNUoFB
        const url = await ngrok.connect(8080);
        console.log(url, " url");
        return url;
    } catch (e) {
        console.error("Connect to ngrok error:");
        console.log(e);
    }
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    applySettings(app);
    /*const config = new DocumentBuilder()
    .setTitle('social-network example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('social-network')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);*/
    const port = 8080;
    await app.listen(port);
}

bootstrap().then((r) => console.log(`APPLICATION STARTED, PROGRAM LOGS: ${r}`));
