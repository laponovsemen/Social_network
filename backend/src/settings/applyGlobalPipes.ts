import {
    BadRequestException,
    INestApplication,
    ValidationPipe,
} from "@nestjs/common";

export const applyGlobalPipes = (app: INestApplication) => {
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            stopAtFirstError: true,
            exceptionFactory: (errors) => {
                const errorsForResponse: any[] = [];
                errors.forEach((e) => {
                    const constrainedKeys = Object.keys(e.constraints);
                    constrainedKeys.forEach((ckey) => {
                        errorsForResponse.push({
                            message: e.constraints[ckey],
                            field: e.property,
                        });
                    });
                });
                throw new BadRequestException(errorsForResponse);
            },
        }),
    );
};
