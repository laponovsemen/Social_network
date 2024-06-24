import { IsNotEmpty, Length } from "class-validator";

export class LoginDTO {
    @IsNotEmpty()
    loginOrEmail: string; //maxLength: 10 minLength: 3 pattern: ^[a-zA-Z0-9_-]*$

    @IsNotEmpty()
    @Length(6, 20)
    password: string; // maxLength: 20 minLength: 6
}
