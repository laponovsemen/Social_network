import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
} from "typeorm";
import { Blog } from "../../../blogs/domain/blog-entity";
import add from "date-fns/add";
import { randomUUID } from "crypto";
import { APISession } from "../../../security.devices/domain/api-session-entity";
import { APIComment } from "../../../comments/domain/api-comment-entity";
import { PairGameQuiz } from "../../../pair.quiz.game/domain/api-pair-game-quiz-entity";
import { APIQuizQuestionAnswer } from "../../../quiz/domain/api-quiz-question-answer-entity";
import { APISubscriptionEntity } from "../../../subscriptions/api-subscription-entity";
import { UserDTO } from "@/features/public/users/api/input/User";

@Entity({ database: "tfaepjvr" })
export class User extends BaseEntity {
    @PrimaryColumn("uuid")
    id: string;
    @Column({ type: "varchar", unique: true, nullable: false, collation: "C" })
    login: string;
    @Column({ type: "varchar", unique: true, nullable: false, collation: "C" })
    email: string;
    @Column({ type: "varchar", unique: false, nullable: false, collation: "C" })
    passwordHash: string;
    @Column()
    createdAt: string;
    @Column()
    isConfirmed: boolean;
    @Column({ nullable: true })
    code: string;
    @Column({ nullable: true })
    codeDateOfExpiary: string | null;
    @Column({ nullable: true })
    banDate: string | null;
    @Column({ nullable: true })
    banReason: string | null;
    @Column()
    isBanned: boolean;
    @OneToMany(() => Blog, (blog) => blog.blogOwner)
    blogs: Blog[];

    @OneToMany(() => APISession, (session) => session.user)
    session: APISession[];

    @OneToMany(() => APIComment, (comment) => comment.commentator)
    comments: APIComment[];

    @OneToMany(() => PairGameQuiz, (g) => g.firstPlayer, {
        onDelete: "SET NULL",
    })
    @JoinColumn()
    gameAsFirstPlayer: PairGameQuiz;

    @OneToMany(() => PairGameQuiz, (g) => g.secondPlayer, {
        onDelete: "SET NULL",
    })
    @JoinColumn()
    gameAsSecondPlayer: PairGameQuiz;
    @OneToMany(
        () => APISubscriptionEntity,
        (subscription) => subscription.subscriber,
        { onDelete: "SET NULL" },
    )
    @JoinColumn()
    subscribtionOfUser: APISubscriptionEntity[];
    @Column({ type: "varchar", nullable: true })
    telegramId: string | null; // telegram id of user
    @Column({ type: "boolean", nullable: true })
    isBotActivated: boolean; // bot activation info
    @Column({ type: "varchar", nullable: true })
    activationBotCode: string | null; // bot activation info

    static createAsAdmin(DTO: UserDTO) {
        const newUser = new User();

        newUser.id = randomUUID();
        newUser.login = DTO.login;
        newUser.passwordHash = DTO.password;
        newUser.email = DTO.email;
        newUser.createdAt = new Date().toISOString();
        newUser.isConfirmed = true;
        newUser.code = null;
        newUser.codeDateOfExpiary = null;
        newUser.banDate = null;
        newUser.banReason = null;
        newUser.isBanned = false;
        newUser.activationBotCode = null;
        newUser.isBotActivated = false;
        newUser.telegramId = null;

        return newUser;
    }

    static createUnconfirmedUser(
        login: string,
        password: string,
        email: string,
        code: string,
    ) {
        const newUser = new User();

        const dateOfCreation = new Date();

        newUser.id = randomUUID();
        newUser.login = login;
        newUser.passwordHash = password;
        newUser.email = email;
        newUser.createdAt = dateOfCreation.toISOString();
        newUser.isConfirmed = false;
        newUser.code = code;
        newUser.codeDateOfExpiary = add(dateOfCreation, {
            minutes: 10,
        }).toISOString();
        newUser.banDate = null;
        newUser.banReason = null;
        newUser.isBanned = false;
        newUser.activationBotCode = null;
        newUser.isBotActivated = false;
        newUser.telegramId = null;

        return newUser;
    }

    static getViewModelOfAllCommentsForSpecificUser(user: User) {
        const blogs = user.blogs;
        /*{
            "id": "string",
            "content": "string",
            "commentatorInfo": {
            "userId": "string",
                "userLogin": "string"
        },
            "createdAt": "2023-07-06T12:36:55.205Z",
            "likesInfo": {
            "likesCount": 0,
                "dislikesCount": 0,
                "myStatus": "None"
        },
            "postInfo": {
            "id": "string",
                "title": "string",
                "blogId": "string",
                "blogName": "string"
        }
        }*/
    }
}
