import { IsBoolean } from "class-validator";

export class BanBlogDTO {
    @IsBoolean()
    isBanned: boolean; //maxLength: 30
}
