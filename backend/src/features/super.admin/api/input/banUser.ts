import { IsBoolean, IsNotEmpty, Length } from "class-validator";

export class BanUserDTO {
    @IsBoolean()
    isBanned: boolean; //maxLength: 30

    @IsNotEmpty()
    @Length(20)
    banReason: string; // maxLength: 100
}
