import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    NotFoundException,
    Param,
    Post,
    Query,
    UseGuards,
} from "@nestjs/common";
import { UsersService } from "../application/users.service";
import { BasicAuthGuard } from "@/infrastructure/guards/basic.auth.guard";
import { UserDTO } from "./input/User";
import { GetAllQuery } from "@/features/public/users/api/input/getAllQuery";

@UseGuards(BasicAuthGuard)
@Controller("users")
export class UsersController {
    constructor(protected readonly usersService: UsersService) {}
    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll(@Query() query: GetAllQuery) {
        return this.usersService.getAllUsers(query);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() user: UserDTO) {
        return await this.usersService.createUser(user);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteById(@Param("id") id: string): Promise<void> {
        const result = await this.usersService.deleteUserById(id);
        if (!result) throw new NotFoundException("not found");

        return;
    }
}
