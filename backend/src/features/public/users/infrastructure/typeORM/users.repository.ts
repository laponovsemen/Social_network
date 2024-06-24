import { Injectable } from "@nestjs/common";
import { SkipThrottle } from "@nestjs/throttler";

@SkipThrottle()
@Injectable()
export class UsersRepository {

}
