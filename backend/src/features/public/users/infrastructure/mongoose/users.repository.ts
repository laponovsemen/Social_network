import { Injectable } from "@nestjs/common";
import { addMinutes } from "date-fns";
import { ApiRepository } from "@/infrastructure/interfaces/repositories";
import { GetAllUsersQuery } from "@/features/public/users/api/input/getAllQuery";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "@/features/public/users/domain/mongoose/user-schema";
import { Model } from "mongoose";

@Injectable()
export class UsersRepository implements ApiRepository {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async deleteAllData() {
        await this.userModel.deleteMany({});
    }

    async getAll(pagination: GetAllUsersQuery) {
        const {
            searchEmailTerm,
            searchLoginTerm,
            sortBy,
            sortDirection,
            pageSize,
            pageNumber,
        } = pagination;

        let searchParams: any[] = [];
        if (searchEmailTerm)
            searchParams.push({
                email: { $regex: searchEmailTerm, $options: "i" },
            });
        if (searchLoginTerm)
            searchParams.push({
                login: { $regex: searchLoginTerm, $options: "i" },
            });

        let filter: { $or?: any[] } = { $or: searchParams };
    }
}
