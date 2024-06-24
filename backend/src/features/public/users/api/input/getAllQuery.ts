import { BasePagination } from "@/infrastructure/validation/input/BasePagination";
import { IsOptional } from "class-validator";

export class GetAllUsersQuery extends BasePagination {
    @IsOptional()
    sortBy: string = "createdAt";
    @IsOptional()
    searchLoginTerm: string;

    @IsOptional()
    searchEmailTerm: string;
}
