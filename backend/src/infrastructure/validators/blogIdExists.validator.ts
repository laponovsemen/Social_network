// import {
//     ValidationArguments,
//     ValidatorConstraint,
//     ValidatorConstraintInterface,
// } from "class-validator";
// import { Injectable } from "@nestjs/common";
// import { BlogsRepository } from "../../features/public/blogs/infrastructure/blogs.repository";
//
// @ValidatorConstraint({ async: true })
// @Injectable()
// export class BlogIdExistsRule implements ValidatorConstraintInterface {
//     constructor(private blogsRepository: BlogsRepository) {}
//
//     async validate(value: string) {
//         try {
//             return !!(await this.blogsRepository.getBlogByIdWithBloggerInfo(
//                 value,
//             ));
//         } catch (e) {
//             return false;
//         }
//     }
//
//     defaultMessage(args: ValidationArguments) {
//         return `Blog doesnt exist with such id`;
//     }
// }