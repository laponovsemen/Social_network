import { Injectable } from "@nestjs/common";
import { GetAllUsersQuery } from "@/features/public/users/api/input/getAllQuery";
import { UsersRepository } from "@/features/public/users/infrastructure/mongoose/users.repository";

@Injectable()
export class UsersService {
    constructor(protected readonly usersRepository: UsersRepository) {}
    getAllUsers(paginationCriteria: GetAllUsersQuery) {
        return this.usersRepository.getAll(paginationCriteria);
    }

    createUser(DTO: any) {
        return this.usersRepository.createUser(DTO);
    }

    deleteUserById(id: string) {
        return this.usersRepository.deleteUserById(id);
    }

    async findUserByLoginOrEmail(loginOrEmail: string, pass: string) {
        return this.usersRepository.findUserByLoginOrEmail(loginOrEmail, pass);
    }

    async findUserById(userId) {
        return this.usersRepository.findUserById(userId);
    }

    async getAllUsersFromDBWithoutPagination() {
        return await this.usersRepository.getAllUsersFromDBWithoutPagination();
    }
}
