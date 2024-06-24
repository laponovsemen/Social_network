import { IsNumberString, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class BasePagination {
    @Type(() => Number)
    @IsNumberString()
    @IsOptional()
    pageSize: number = 10;
    @Type(() => Number)
    @IsNumberString()
    @IsOptional()
    pageNumber: number = 1;

    @IsOptional()
    sortDirection: "asc" | "desc" = "asc";
}
