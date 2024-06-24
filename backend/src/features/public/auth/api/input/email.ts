import { IsNotEmpty, Matches } from "class-validator";

export class emailDTO {
    @IsNotEmpty()
    @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    email: string; //maxLength: 10 minLength: 3 pattern: ^[a-zA-Z0-9_-]*$
}
